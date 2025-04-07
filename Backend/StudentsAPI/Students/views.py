from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import StudentSerializer
from .models import Students
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
    



