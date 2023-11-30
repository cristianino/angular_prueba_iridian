import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Contacto } from '../models/contacto';
import { AreaDeContacto } from '../models/area-de-contacto';
import { ContactoService } from '../services/contacto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  areasDeContacto: AreaDeContacto[] = [];
  contactoForm: FormGroup = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    correo: [''],
    celular: [''],
    areaDeContacto: [0],
    mensaje: ['']
  });

  constructor(private formBuilder: FormBuilder,
    private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      celular: [''],
      areaDeContacto: [0],
      mensaje: ['']
    });

    this.cargarAreasDeContacto();
  }

  cargarAreasDeContacto(): void {
    this.contactoService.getAreasDeContacto().subscribe(
      (areas) => {
        this.areasDeContacto = areas;
      },
      (error) => {
        console.error('Error al cargar las áreas de contacto:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.contactoForm.valid) {
      this.contactoService.enviarContacto(this.contactoForm.value).subscribe(
        response => {
          console.log('Formulario enviado con éxito', response);
        },
        error => {
          console.error('Error al enviar el formulario:', error);
        }
      );
    }
  }
}
