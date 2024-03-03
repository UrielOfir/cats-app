import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CatSession } from './catSession.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @Column()
  location: string;

  @Column()
  food: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  image: string;

  // Define a one-to-many relationship to CatSession
  // This allows you to access all sessions associated with a cat directly from the Cat entity
  @OneToMany(() => CatSession, (catSession) => catSession.cat)
  catSessions: CatSession[];

  // computed on queries not part of schema
  likes?: number;
}
