import { DataTypes, Model } from "sequelize";

export class CouponProduct extends Model {}

export function initCouponProduct(sequelize) {
  CouponProduct.init(
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
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CouponProduct",
      tableName: "coupon_products",
    },
  );

  return CouponProduct;
}
