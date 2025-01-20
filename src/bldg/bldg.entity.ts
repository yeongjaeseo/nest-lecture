import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'seoyj', name: 'bldg' })
export class Bldg {
  @PrimaryGeneratedColumn()
  bldg_id: number;

  @Column({ type: 'integer', nullable: false })
  bldg_sn: number;

  @Column({ type: 'integer', nullable: false })
  rds_sn: number;

  @Column({ type: 'text', nullable: false })
  sig_cd: string;

  @Column({ type: 'text', nullable: false })
  emd_cd: string;

  @Column({ type: 'text', nullable: true })
  lotno_addr: string;

  @Column({ type: 'text', nullable: true })
  road_nm_addr: string;

  @Column({ type: 'text', nullable: true })
  bldg_nm: string;

  @Column({ type: 'geometry', nullable: false })
  bldg_geom: string;

  @Column({ type: 'integer', nullable: true })
  gro_flo_co: number;

  @Column({ type: 'integer', nullable: true })
  und_flo_co: number;

  @Column({ type: 'text', nullable: false })
  bdtyp_cd: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  crt_dt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  mdfcn_dt: Date;

  @Column({ type: 'timestamptz', nullable: true, comment: '건물색 구별' })
  recent_poi_dtl_crt_dt: Date;
}
