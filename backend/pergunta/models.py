from django.db import models


class Pergunta(models.Model):
    """
    Model que representa uma pergunta do quiz
    """
    texto = models.TextField(verbose_name="Enunciado da Pergunta")
    resposta_correta_id = models.CharField(
        max_length=1,
        default='a',
        verbose_name="ID da Resposta Correta",
        help_text="Letra da alternativa correta (a, b, c, d)"
    )
    explicacao = models.TextField(
        default='',
        verbose_name="Explicação da Resposta",
        help_text="Explicação sobre por que esta é a resposta correta"
    )

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Pergunta"
        verbose_name_plural = "Perguntas"
        ordering = ['id']

    def __str__(self):
        return self.texto[:70]


class Alternativa(models.Model):
    """
    Model que representa uma alternativa de uma pergunta
    """
    pergunta = models.ForeignKey(
        Pergunta,
        on_delete=models.CASCADE,
        related_name='alternativas'
    )
    identificador = models.CharField(
        max_length=1,
        default='a',
        verbose_name="Identificador",
        help_text="Letra da alternativa (a, b, c, d)"
    )
    texto = models.CharField(
        max_length=255,
        verbose_name="Texto da Alternativa"
    )

    class Meta:
        verbose_name = "Alternativa"
        verbose_name_plural = "Alternativas"
        ordering = ['identificador']
        unique_together = ['pergunta', 'identificador']

    def __str__(self):
        return f"{self.identificador}) {self.texto}"
