import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['domainName'])
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domainName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  shopLogo: string;

  @Column({ default: '#00a5ba' })
  primaryColor: string;

  @Column({ default: '#b61a84' })
  secondaryColor: string;

  @Column({ nullable: true })
  shopAddress: string;

  @Column({ nullable: true })
  contact: string;

  @OneToOne(() => User, (user) => user.setting, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
