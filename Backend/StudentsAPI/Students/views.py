from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer,TeacherSerializer,FacultesSerializer,MentionSerializer,ParcoursSerializer,CoursSerializer,NotesSerializer,GradeSerializer
from .models import Students,Teacher,Facultes,Mention,Parcours,Grade,Cours,Notes
import qrcode,json
from io import BytesIO

numero_d_incription = 71546466



class StudentList(APIView):
    def get(self, request,pk=None):
        if pk:
            pk = int(pk)
            student = Students.objects.get(pk=pk)
            data = StudentSerializer(student).data
            return JsonResponse(data, safe=False)
        students = Students.objects.all()
        data = StudentSerializer(students, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        global numero_d_incription
      
        serializer = StudentSerializer(data=request.data)
        
        if serializer.is_valid():
            # Sauvegarder d'abord l'étudiant sans le QR code
            student = serializer.save()
            
            try:
                # Préparer les données pour le QR code
                student_data = {
                    
                    'name': student.name,
                    'first_name': student.first_name,
                    'email': student.email,
                    'phone_number': student.phone_number,
                    'numero_d_incription': str(numero_d_incription),
                }

                
                
                data_string = json.dumps(student_data)
                
                # Créer une instance QRCode
                qr = qrcode.QRCode(
                    version=1,
                    error_correction=qrcode.constants.ERROR_CORRECT_L,
                    box_size=10,
                    border=4,
                )
                
                # Ajouter les données
                qr.add_data(data_string)
                qr.make(fit=True)
                
                # Créer l'image
                img = qr.make_image(fill_color="black", back_color="white")
                
                # Sauvegarder dans un buffer
                buffer = BytesIO()
                img.save(buffer, format='PNG')
                
                # Enregistrer le QR code dans le modèle
                filename = f"qr_{student.id}.png"
                student.qr_code.save(filename, ContentFile(buffer.getvalue()))
                student.numero_d_inscription = str(numero_d_incription)
                numero_d_incription -=1
                student.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                # En cas d'erreur avec le QR code, supprimer l'étudiant créé
                student.delete()
                return Response(
                    {'error': f'Erreur lors de la génération du QR code: {str(e)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk):
        pk = int(pk)
        student = Students.objects.get(pk=pk)
        student.delete()
        return JsonResponse({'message': 'Student deleted successfully'}, status=204)
    


class TeacherView(APIView):
    def get(self, request,pk=None,status=None,responsable=None):
        if pk:
            pk = int(pk)
            teachers = Teacher.objects.get(pk=pk)
            data = TeacherSerializer(teachers).data
            return JsonResponse(data, safe=False)
        if status:
            teachers = Teacher.objects.filter(status=status)
            data = TeacherSerializer(teachers, many=True).data
            return JsonResponse(data, safe=False)
        if responsable:
            teachers = Teacher.objects.filter(responsable=responsable)
            data = TeacherSerializer(teachers, many=True).data
            return JsonResponse(data, safe=False)
        teachers = Teacher.objects.all()
        data = TeacherSerializer(teachers, many=True).data
        return JsonResponse(data, safe=False)
    

        
    
    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):  
        pk = int(pk)
        teacher = Teacher.objects.get(pk=pk)
        teacher.delete()
        return JsonResponse({'message': 'Teacher deleted successfully'}, status=204)
    
class FacultesView(APIView):
    def get(self, request,pk=None,directeur=None):
        if pk:
            pk = int(pk)
            facultes = Facultes.objects.get(pk=pk)
            data = FacultesSerializer(facultes).data
            return JsonResponse(data, safe=False)
        
        if directeur:
            facultes = Facultes.objects.filter(directeur=directeur)
            data = FacultesSerializer(facultes, many=True).data
            return JsonResponse(data, safe=False)
        facultes = Facultes.objects.all()
        data = FacultesSerializer(facultes, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = FacultesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        facultes = Facultes.objects.get(pk=pk)
        facultes.delete()
        return JsonResponse({'message': 'Facultes deleted successfully'}, status=204)
    
class MentionView(APIView):
    def get(self, request,pk=None,chefMention=None):
        if pk:
            pk = int(pk)
            mention = Mention.objects.get(pk=pk)
            data = MentionSerializer(mention).data
            return JsonResponse(data, safe=False)
        
        if chefMention:
            mention = Mention.objects.filter(chefMention=chefMention)
            data = MentionSerializer(mention, many=True).data
            return JsonResponse(data, safe=False)
        mention = Mention.objects.all()
        data = MentionSerializer(mention, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = MentionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        mention = Mention.objects.get(pk=pk)
        mention.delete()
        return JsonResponse({'message': 'Mention deleted successfully'}, status=204)
    
class ParcoursView(APIView):
    def get(self, request,pk=None):
        if pk:
            pk = int(pk)
            parcours = Parcours.objects.get(pk=pk)
            data = ParcoursSerializer(parcours).data
            return JsonResponse(data, safe=False)
        parcours = Parcours.objects.all()
        data = ParcoursSerializer(parcours, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = ParcoursSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        parcours = Parcours.objects.get(pk=pk)
        parcours.delete()
        return JsonResponse({'message': 'Parcours deleted successfully'}, status=204)
    
class CoursView(APIView):
    def get(self, request,pk=None):
        if pk:
            pk = int(pk)
            cours = Cours.objects.get(pk=pk)
            data = CoursSerializer(cours).data
            return JsonResponse(data, safe=False)
        cours = Cours.objects.all()
        data = CoursSerializer(cours, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = CoursSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        cours = Cours.objects.get(pk=pk)
        cours.delete()
        return JsonResponse({'message': 'Cours deleted successfully'}, status=204)
    

class NotesView(APIView):
    def get(self, request,pk=None,student=None,cours=None,teacher=None):
        if pk:
            pk = int(pk)
            notes = Notes.objects.get(pk=pk)
            data = NotesSerializer(notes).data
            return JsonResponse(data, safe=False)
        
        if student:
            notes = Notes.objects.filter(student=student)
            data = NotesSerializer(notes, many=True).data
            return JsonResponse(data, safe=False)
        
        if cours:
            notes = Notes.objects.filter(cours=cours)
            data = NotesSerializer(notes, many=True).data
            return JsonResponse(data, safe=False)
        
        if teacher:
            notes = Notes.objects.filter(teacher=teacher)
            data = NotesSerializer(notes, many=True).data
            return JsonResponse(data, safe=False)
        
        notes = Notes.objects.all()
        data = NotesSerializer(notes, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = NotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        notes = Notes.objects.get(pk=pk)
        notes.delete()
        return JsonResponse({'message': 'Notes deleted successfully'}, status=204)
    
class GradeView(APIView):
    def get(self, request,pk=None):
        if pk:
            pk = int(pk)
            grade = Grade.objects.get(pk=pk)
            data = GradeSerializer(grade).data
            return JsonResponse(data, safe=False)
        grade = Grade.objects.all()
        data = GradeSerializer(grade, many=True).data
        return JsonResponse(data, safe=False)
    
    def post(self, request):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        pk = int(pk)
        grade = Grade.objects.get(pk=pk)
        grade.delete()
        return JsonResponse({'message': 'Grade deleted successfully'}, status=204)
    


