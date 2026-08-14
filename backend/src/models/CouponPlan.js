import { DataTypes, Model } from "sequelize";

export class CouponPlan extends Model {}

export function initCouponPlan(sequelize) {
  CouponPlan.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CouponPlan",
      tableName: "coupon_plans",
    },
  );

  return CouponPlan;
}
