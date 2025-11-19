from rest_framework import serializers

from .models import Progresso


class ProgressoSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)
    arvores = serializers.ReadOnlyField()
    jogo_finalizado = serializers.ReadOnlyField()
    meta_vitoria = serializers.ReadOnlyField()
    progresso_percentual = serializers.ReadOnlyField()
    atingiu_vitoria = serializers.ReadOnlyField()
    completou_tudo = serializers.ReadOnlyField()
    acertos_calculados = serializers.ReadOnlyField()

    class Meta:
        model = Progresso
        fields = [
            'id', 'usuario', 'arvores', 'meta_arvores', 'meta_vitoria',
            'total_acertos', 'total_erros', 'acertos_calculados',
            'fase_atual', 'progresso_percentual', 'atingiu_vitoria',
            'completou_tudo', 'jogo_finalizado', 'fases_concluidas',
            'jogo_iniciado', 'atualizado_em'
        ]
