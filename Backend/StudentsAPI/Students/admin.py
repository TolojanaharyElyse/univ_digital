from django.contrib import admin
from .models import Students,Teacher,Cours,Parcours,Notes

admin.site.register(Students)
admin.site.register(Teacher)
admin.site.register(Cours)
admin.site.register(Parcours)
admin.site.register(Notes)