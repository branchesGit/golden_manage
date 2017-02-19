create database goodsstore;

DROP TABLE IF EXISTS goodstype;

CREATE TABLE  goodstype(
	goodsTypeId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	goodsTypeName VARCHAR(16) NOT NULL UNIQUE,
	superGoodsTypeId INT,
	cdate TIMESTAMP NOT NULL DEFAULT NOW() 
);


SELECT * FROM goodstype;


CREATE TABLE goods (
	goodsId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	goodsNO VARCHAR(16) NOT NULL UNIQUE,
	goodsName VARCHAR(20) NOT NULL,
	goodsTypeName VARCHAR(20) NOT NULL,
	goodsWeight VARCHAR(10) ,
	unitFee VARCHAR(6),
	originPrice VARCHAR(8),
	inlayFee  VARCHAR(10)
);