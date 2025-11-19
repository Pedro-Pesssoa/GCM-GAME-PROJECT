from rest_framework import serializers

from .models import Alternativa, Pergunta


class AlternativaSerializer(serializers.ModelSerializer):
    """Serializer para alternativas no formato do frontend"""
    id = serializers.CharField(source='identificador')
    text = serializers.CharField(source='texto')

    class Meta:
        model = Alternativa
        fields = ['id', 'text']


class PerguntaSerializer(serializers.ModelSerializer):
    """Serializer para perguntas no formato do frontend"""
    question = serializers.CharField(source='texto')
    options = AlternativaSerializer(
        source='alternativas',
        many=True,
        read_only=True
    )
    correctAnswerId = serializers.CharField(source='resposta_correta_id')
    explanation = serializers.CharField(source='explicacao')

    class Meta:
        model = Pergunta
        fields = [
            'id',
            'question',
            'options',
            'correctAnswerId',
            'explanation'
        ]
