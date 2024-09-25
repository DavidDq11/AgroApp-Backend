import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Decorador que marca esta clase como una entidad
export class User {
  @PrimaryGeneratedColumn() // Columna de clave primaria autogenerada
  id: number;

  @Column({ unique: true }) // Columna única para el nombre de usuario
  username: string;

  @Column('text')
  password: string;

  @Column() // Columna para el nombre del usuario
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true }) // Asegúrate de que la columna esté definida
  isActive: boolean;
}
