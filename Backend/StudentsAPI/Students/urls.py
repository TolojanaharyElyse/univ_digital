from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.StudentList.as_view(), name='student-list'),
    path('students/<str:pk>/', views.StudentList.as_view(), name='student-detail'),

    path('teacher/', views.TeacherView.as_view(), name='teacher-list'),
    path('teacher/<str:pk>/', views.TeacherView.as_view(), name='teacher-detail-pk'),
    path('teacher/status/<str:status>/', views.TeacherView.as_view(), name='teacher-detail-status'),
    path('teacher/responsable/<str:responsable>/', views.TeacherView.as_view(), name='teacher-detail-responsable'),

    path('cours/', views.CoursView.as_view(), name='cours-list'),
    path('cours/<str:pk>/', views.CoursView.as_view(), name='cours-detail'),

    path('parcours/', views.ParcoursView.as_view(), name='parcours-list'),
    path('parcours/<str:pk>/', views.ParcoursView.as_view(), name='parcours-detail'),

    path('notes/', views.NotesView.as_view(), name='notes-list'),
    path('notes/<str:pk>/', views.NotesView.as_view(), name='notes-detail'),
    path('notes/student/<str:student>/', views.NotesView.as_view(), name='notes-detail-student'),
    path('notes/cours/<str:cours>/', views.NotesView.as_view(), name='notes-detail-cours'),
    path('notes/teacher/<str:teacher>/', views.NotesView.as_view(), name='notes-detail-teacher'),


    path('facultes/', views.FacultesView.as_view(), name='facultes-list'),
    path('facultes/<str:pk>/', views.FacultesView.as_view(), name='facultes-detail'),
    path('facultes/directeur/<str:directeur>/', views.FacultesView.as_view(), name='facultes-detail-directeur'),

    path('mention/', views.MentionView.as_view(), name='mention-list'),
    path('mention/<str:pk>/', views.MentionView.as_view(), name='mention-detail'),
    path('mention/chefMention/<str:chefMention>/', views.MentionView.as_view(), name='mention-detail-chefMention'),

    path('grade/', views.GradeView.as_view(), name='grade-list'),
    path('grade/<str:pk>/', views.GradeView.as_view(), name='grade-detail'),


    

    
    
]