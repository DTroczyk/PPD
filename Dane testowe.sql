USE [PPD]
GO

-- Parcel Types

INSERT INTO ParcelTypes VALUES ('S','Maksymalny rozmiar paczki:',899);
INSERT INTO ParcelTypes VALUES ('M','Maksymalny rozmiar paczki:',1199);
INSERT INTO ParcelTypes VALUES ('L','Maksymalny rozmiar paczki:',1499);
INSERT INTO ParcelTypes VALUES ('XL','Maksymalny rozmiar paczki:',1999);
INSERT INTO ParcelTypes VALUES ('XXL','Maksymalny rozmiar paczki:',2999);

SELECT * FROM ParcelTypes;

-- Address

INSERT INTO Addresses VALUES ('Cz�stochowa','Koksowa','42-200','6b',50.792231, 19.184544);
INSERT INTO Addresses VALUES ('Radomsko','Aristide Merloniego','97-504','1',51.088343, 19.383937);
INSERT INTO Addresses VALUES ('Przemy�l','Ostr�w','37-700','338',49.793152, 22.720340);

SELECT * FROM Addresses;

-- Warhouse

INSERT INTO Warehouses VALUES (1);
INSERT INTO Warehouses VALUES (2);
INSERT INTO Warehouses VALUES (3);

SELECT * FROM Warehouses;

-- User - Stork

INSERT INTO Users VALUES ('bocian01','haslo','jan.kowalski@ppd.pl','Jan','Kowalski', 2, 1, 'Stork', 1);
INSERT INTO Users VALUES ('bocian02','haslo','jerzy.wroblewski@ppd.pl','Jerzy','Wroblewski', 2, 1,'Stork',2);
INSERT INTO Users VALUES ('bocian03','haslo','piotr.szymanski@ppd.pl','Piotr','Szymanski', 2, 1,'Stork',3);

-- User - Pigeon

INSERT INTO Users VALUES ('golab01','haslo','tomasz.kucharski@ppd.pl','Tomasz','Kucharski',3, 1,'Pigeon', 1);
INSERT INTO Users VALUES ('golab02','haslo','joanna.wozniak@ppd.pl','Joanna','Wozniak',3, 1, 'Pigeon', 2);
INSERT INTO Users VALUES ('golab03','haslo','marta.sobczak@ppd.pl','Marta','Sobczak',3, 1, 'Pigeon', 3);

SELECT * FROM Users;

-- Parcel

INSERT INTO Parcels VALUES (0,'golab02','S',SYSDATETIME(), null,'Tomasz Nowak','Cz�stochowa','al. Wolno�ci','42-200','21b','jan.nowak@wp.pl','754562472','Joe Doe','Przemy�l','Polna','37-700','22','joedoe@gmial.com','745164258');
INSERT INTO Parcels VALUES (1,null,'M',SYSDATETIME(), null,'Tomasz Nowak','Cz�stochowa','al. Wolno�ci','42-200','21b','jan.nowak@wp.pl','754562472','Jane Doe','Przemy�l','Polna','37-700','22','janedoe@gmial.com','745164255');

SELECT * FROM Parcels;

-- PigeonParcels

INSERT INTO PigeonParcels VALUES ('golab02',1500000000);
INSERT INTO PigeonParcels VALUES ('golab02',1500000001);
INSERT INTO PigeonParcels VALUES ('golab03',1500000001);

SELECT * FROM PigeonParcels

-- WarhouseParcels

INSERT INTO WarehouseParcels VALUES (1,1500000000);
INSERT INTO WarehouseParcels VALUES (1,1500000001);
INSERT INTO WarehouseParcels VALUES (3,1500000001);

SELECT * FROM WarehouseParcels

