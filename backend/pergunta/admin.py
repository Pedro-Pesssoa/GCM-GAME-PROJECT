from django.contrib import admin

from .models import Alternativa, Pergunta


class AlternativaInline(admin.TabularInline):
    model = Alternativa
    extra = 4
    fields = ['identificador', 'texto']


@admin.register(Pergunta)
class PerguntaAdmin(admin.ModelAdmin):
    list_display = ['id', 'texto_resumido', 'resposta_correta_id', 'criado_em']
    search_fields = ['texto', 'explicacao']
    list_filter = ['criado_em']
    inlines = [AlternativaInline]

    def texto_resumido(self, obj):
        return obj.texto[:50] + '...' if len(obj.texto) > 50 else obj.texto
    texto_resumido.short_description = 'Pergunta'


@admin.register(Alternativa)
class AlternativaAdmin(admin.ModelAdmin):
    list_display = ['id', 'pergunta', 'identificador', 'texto']
    list_filter = ['pergunta']
    search_fields = ['texto']
