// session.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
@Unique(['cat_id', 'session_id'])
export class CatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index() // Add an index to improve lookup performance
  @Column()
  cat_id: string;

  @Index() // Another index for session lookups
  @Column()
  session_id: string;

  @ManyToOne(() => Cat, (cat) => cat.catSessions) // Assuming you add a corresponding property in Cat
  @JoinColumn({ name: 'cat_id' })
  cat: Cat;
}
