import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    colaborators: number;

    @OneToMany(() => TaskEntity, task => task.project, { cascade: true })
    tasks: TaskEntity[];
}