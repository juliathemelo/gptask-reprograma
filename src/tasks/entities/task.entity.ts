import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { PriorityType } from './priority.type';
import { ProjectEntity } from 'src/project/entities/project.entity';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    resume: string;

    @Column()
    status: string;

    //@OneToMany(() => AccountEntity, account => account.idClient)
    @Column()
    priority: PriorityType;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks) // Define a relação ManyToOne
    project: ProjectEntity;
}