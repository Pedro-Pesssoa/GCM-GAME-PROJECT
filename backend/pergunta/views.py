import random

from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Pergunta
from .serializers import PerguntaSerializer


class IsCreateOrAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        # permite GET e POST públicos
        if request.method in ["GET", "POST"]:
            return True
        return request.user and request.user.is_authenticated


class PerguntaViewSet(viewsets.ModelViewSet):
    """
    CRUD completo + endpoint para retornar pergunta aleatória.
    """
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer
    permission_classes = [IsCreateOrAuthenticated]

    @action(detail=False, methods=["get"], url_path="aleatoria")
    def pergunta_aleatoria(self, request):
        """
        Retorna uma pergunta aleatória do banco de dados.
        Se não houver perguntas, retorna 404.
        """
        # Buscar todas as perguntas
        perguntas = list(Pergunta.objects.all())
        if not perguntas:
            return Response(
                {"detail": "Nenhuma pergunta cadastrada"},
                status=status.HTTP_404_NOT_FOUND,
            )

        pergunta = random.choice(perguntas)
        serializer = self.get_serializer(pergunta)
        return Response(serializer.data, status=status.HTTP_200_OK)
