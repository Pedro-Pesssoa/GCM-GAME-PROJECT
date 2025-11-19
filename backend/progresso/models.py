from django.conf import settings
from django.db import models


class Progresso(models.Model):
    """
    Representa o estado atual do jogo de um jogador.
    """
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='progresso'
    )
    meta_arvores = models.PositiveIntegerField(
        default=25,
        help_text="Meta de árvores para vencer (total de perguntas)."
    )
    fases_concluidas = models.JSONField(
        default=dict,
        help_text="Dicionário com fases concluídas: {fase_id: acertos}"
    )
    total_acertos = models.PositiveIntegerField(default=0)
    total_erros = models.PositiveIntegerField(default=0)
    fase_atual = models.PositiveIntegerField(default=1)
    jogo_iniciado = models.BooleanField(
        default=False,
        help_text="Indica se o usuário já iniciou o jogo pela primeira vez"
    )

    atualizado_em = models.DateTimeField(auto_now=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Progresso de {self.usuario.username}"

    @property
    def arvores(self):
        """Número de árvores = soma de acertos em fases únicas concluídas."""
        if not self.fases_concluidas:
            return 0
        return sum(self.fases_concluidas.values())
    
    @property
    def acertos_calculados(self):
        """Calcula total de acertos baseado nas fases concluídas."""
        return self.arvores  # arvores já é a soma dos acertos únicos

    @property
    def meta_vitoria(self):
        """Meta de 80% das árvores para vitória."""
        return int(self.meta_arvores * 0.8)

    @property
    def progresso_percentual(self):
        """Calcula o percentual de progresso."""
        if self.meta_arvores == 0:
            return 0
        return (self.arvores / self.meta_arvores) * 100

    @property
    def atingiu_vitoria(self):
        """Verifica se atingiu a condição de vitória (80%)."""
        return self.arvores >= self.meta_vitoria

    @property
    def completou_tudo(self):
        """Verifica se completou 100% das árvores."""
        return self.arvores >= self.meta_arvores

    def registrar_acerto(self):
        """Incrementa acertos (automaticamente planta uma árvore)."""
        self.total_acertos += 1
        self.save()

    def registrar_erro(self):
        """Incrementa erros (sem penalidade de cortar árvore)."""
        self.total_erros += 1
        self.save()

    def registrar_fase_concluida(self, fase_id, acertos):
        """Registra uma fase como concluída (apenas se 100% acertos)."""
        if not self.fases_concluidas:
            self.fases_concluidas = {}
        
        fase_key = str(fase_id)
        # Só atualiza se for a primeira vez ou se melhorou a pontuação
        if fase_key not in self.fases_concluidas:
            self.fases_concluidas[fase_key] = acertos
        else:
            # Atualiza apenas se for maior (permite melhorar)
            anterior = self.fases_concluidas[fase_key]
            self.fases_concluidas[fase_key] = max(anterior, acertos)
        
        self.save()

    @property
    def jogo_finalizado(self):
        """Verifica se o jogo terminou (vitória quando atinge 80% ou mais)."""
        if self.atingiu_vitoria:
            return "vitoria"
        return None
