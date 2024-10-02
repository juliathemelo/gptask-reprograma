import { ProjectEntity } from 'src/project/entities/project.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: number;

    @Column()
    name: string;

    //@OneToMany(() => AccountEntity, account => account.idClient)
    @OneToMany(() => ProjectEntity, project => project.owner)
    projects: ProjectEntity[];
}