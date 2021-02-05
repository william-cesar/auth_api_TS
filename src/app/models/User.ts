import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
