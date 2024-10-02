import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ClientEntity, owner => owner.projects)
    owner: ClientEntity;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    colaborators: number;

    @OneToMany(() => TaskEntity, task => task.project, { cascade: true })
    tasks: TaskEntity[];
}