const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

module.exports = sequelize.define(
  "MissionSummaries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    pilot_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mission_uuid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    drone_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    drone_uin: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    drone_uuid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    plan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    mission_height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    boundary_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    edited_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pilot_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    mission_started_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mission_ended_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    take_off_location: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: true,
    },
    clearance_height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    payload_at_start: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    payload_at_end: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    battery_capacity_at_start: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    battery_capacity_at_end: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    area_sprayed_at_start: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    area_sprayed_at_end: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    flight_time: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    battery_sn_one: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    battery_sn_two: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    arm_cycle: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    other: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value) {
        if (Array.isArray(value) || typeof value === "object") {
          this.setDataValue("other", JSON.stringify(value));
        } else {
          this.setDataValue("other", value);
        }
      },
    },
    units: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    warnings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
 
  {
    tableName: "mission_summaries",
  },
);
