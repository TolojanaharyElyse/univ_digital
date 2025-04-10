from rest_framework import serializers
from .models import Students,Teacher,Facultes,Mention,Cours,Parcours,Notes,Grade

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class FacultesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facultes
        fields = '__all__'

class MentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mention
        fields = '__all__'

class ParcoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcours
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours
        fields = '__all__'

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'




