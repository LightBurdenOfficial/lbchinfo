const Sequelize = require('sequelize')

function generate(sequelize) {
  let LPP20 = sequelize.define('lpp20', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    decimals: Sequelize.INTEGER(3).UNSIGNED,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    },
    version: {
      type: Sequelize.BLOB,
      allowNull: true
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let LPP20Balance = sequelize.define('lpp20_balance', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    address: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    balance: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let balance = this.getDataValue('balance')
        return balance == null ? null : BigInt(`0x${balance.toString('hex')}`)
      },
      set(balance) {
        if (balance != null) {
          this.setDataValue(
            'balance',
            Buffer.from(balance.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let lpp721 = sequelize.define('lpp721', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let LPP721Token = sequelize.define('lpp721_token', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    tokenId: {
      type: Sequelize.CHAR(32).BINARY,
      primaryKey: true
    },
    holder: Sequelize.CHAR(20).BINARY
  }, {freezeTableName: true, underscored: true, timestamps: false})

  sequelize.models.contract.hasOne(LPP20, {as: 'lpp20', foreignKey: 'contractAddress'})
  LPP20.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(LPP20Balance, {as: 'lpp20Balances', foreignKey: 'contractAddress'})
  LPP20Balance.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasOne(lpp721, {as: 'lpp721', foreignKey: 'contractAddress'})
  lpp721.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(LPP721Token, {as: 'lpp721Tokens', foreignKey: 'contractAddress'})
  LPP721Token.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
}

module.exports = generate
