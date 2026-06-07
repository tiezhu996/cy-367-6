import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class StudyRecord extends Model {
  public id!: number;
  public user_id!: string;
  public user_name!: string;
  public study_date!: Date;
  public duration_minutes!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

StudyRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    study_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    duration_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "study_records",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "study_date"],
      },
    ],
  }
);
