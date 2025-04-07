from django.db import models

class Students(models.Model):
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    sexe = models.CharField(max_length=100)
    date_de_naissance = models.DateField()
    lieu_de_naissance = models.CharField(max_length=100)
    mention = models.CharField(max_length=100)
    parcours = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)
    niveau = models.IntegerField()
    numero_d_inscription = models.CharField(max_length=20, unique=True ,null=True, blank=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    photo = models.ImageField(upload_to='photos/')
    qr_code = models.ImageField(upload_to='qr_codes/',null=True, blank=True)

    def __str__(self):
        return self.name
    

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    sexe = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name
    
class Parcours(models.Model):
    nomParcours = models.CharField(max_length=100)
    proff_responsable =models.ForeignKey(Teacher,on_delete=models.CASCADE)
    grade = models.CharField(max_length=100)
    niveau = models.CharField(max_length=100)


    def __str__(self):
        return self.nomParcours
    
class Cours(models.Model):
    nomCours = models.CharField(max_length=100)
    id_prof = models.ForeignKey(Teacher,on_delete=models.CASCADE)
    id_parcour = models.ForeignKey(Parcours,on_delete=models.CASCADE)

    def __str__(self):
        return self.nomCours
    
class Notes(models.Model):
    etudiant = models.ForeignKey(Students,on_delete=models.CASCADE)
    cours = models.ForeignKey(Cours,on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE)
    note = models.FloatField()

    def __str__(self):
        return self.etudiant.name
