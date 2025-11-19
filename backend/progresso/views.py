from django.shortcuts import render
# Create your views here.
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Progresso
from .serializers import ProgressoSerializer


class ProgressoViewSet(viewsets.ModelViewSet):
    """
    Gerencia o progresso do jogo do usuário logado.
    """
    serializer_class = ProgressoSerializer
    permission_classes = [IsAuthenticated]
    queryset = Progresso.objects.all()
    
    def list(self, request, *args, **kwargs):
        progresso = Progresso.objects.filter(usuario=request.user).first()
        if not progresso:
            return Response(
                {"detail": "Progresso não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)


    def get_queryset(self):
        return Progresso.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['post'], url_path='acerto')
    def registrar_acerto(self, request):
        progresso, _ = Progresso.objects.get_or_create(usuario=request.user)
        progresso.registrar_acerto()
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='erro')
    def registrar_erro(self, request):
        progresso, _ = Progresso.objects.get_or_create(usuario=request.user)
        progresso.registrar_erro()
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='fase-concluida')
    def fase_concluida(self, request):
        """Registra a conclusão de uma fase (apenas se 100% acertos)."""
        fase_id = request.data.get('fase_id')
        acertos = request.data.get('acertos')
        total = request.data.get('total')
        
        if not fase_id or acertos is None or total is None:
            return Response(
                {"detail": "fase_id, acertos e total são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        progresso, _ = Progresso.objects.get_or_create(
            usuario=request.user
        )
        
        # Registra erros da tentativa atual
        erros = total - acertos
        if erros > 0:
            progresso.total_erros += erros
        
        # Só registra fase concluída se acertou 100%
        if acertos == total:
            progresso.registrar_fase_concluida(fase_id, acertos)
        
        progresso.save()
        serializer = self.get_serializer(progresso)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='resetar')
    def resetar_progresso(self, request):
        """Reseta o progresso do usuário para iniciar um novo jogo."""
        try:
            progresso = Progresso.objects.get(usuario=request.user)
            progresso.fases_concluidas = {}
            progresso.total_acertos = 0
            progresso.total_erros = 0
            progresso.fase_atual = 1
            progresso.jogo_iniciado = True  # Marca que o jogo foi iniciado
            progresso.save()
            serializer = self.get_serializer(progresso)
            return Response(serializer.data)
        except Progresso.DoesNotExist:
            # Se não existe, cria um novo progresso zerado e marca iniciado
            progresso = Progresso.objects.create(
                usuario=request.user,
                jogo_iniciado=True
            )
            serializer = self.get_serializer(progresso)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
