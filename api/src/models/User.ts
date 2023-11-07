import { DataTypes } from 'sequelize'
import { sequelize } from 'src/database'

export const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
})
