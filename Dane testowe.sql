USE [PPD]
GO

-- Parcel Types

INSERT INTO ParcelTypes VALUES ('S','Maksymalny rozmiar paczki:',899);
INSERT INTO ParcelTypes VALUES ('M','Maksymalny rozmiar paczki:',1199);
INSERT INTO ParcelTypes VALUES ('L','Maksymalny rozmiar paczki:',1499);
INSERT INTO ParcelTypes VALUES ('XL','Maksymalny rozmiar paczki:',1999);

SELECT * FROM ParcelTypes;

-- Warhouse

INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Czêstochowa', 50.792231, 19.184544, '6b', '42-200', 'Koksowa');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Radomsko', 51.088343, 19.383937, '1', '97-504', 'Aristide Merloniego');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Przemyœl', 49.793152, 22.720340, '338', '37-700', 'Ostrów')


SELECT * FROM Warehouses;

-- User - Stork

INSERT INTO Users VALUES ('bocian01','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jan.kowalski@ppd.pl','Jan','Kowalski', 2, 1, 'Stork', 1);
INSERT INTO Users VALUES ('bocian02','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jerzy.wroblewski@ppd.pl','Jerzy','Wroblewski', 2, 1,'Stork',2);
INSERT INTO Users VALUES ('bocian03','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','piotr.szymanski@ppd.pl','Piotr','Szymanski', 2, 1,'Stork',3);

-- User - Pigeon

INSERT INTO Users VALUES ('golab01','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','tomasz.kucharski@ppd.pl','Tomasz','Kucharski',3, 1,'Pigeon', 1);
INSERT INTO Users VALUES ('golab02','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','joanna.wozniak@ppd.pl','Joanna','Wozniak',3, 1, 'Pigeon', 2);
INSERT INTO Users VALUES ('golab03','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','marta.sobczak@ppd.pl','Marta','Sobczak',3, 1, 'Pigeon', 3);

SELECT * FROM Users;

-- Parcel

INSERT INTO [dbo].[Parcels] ([ParcelStatus],[PigeonId],[ParcelTypeId],[SendDate],[ReceivedDate],[SenderName],[SenderCity],[SenderStreet],[SenderPostalCode],[SenderHouseNumber],[SenderEmail],[SenderPhoneNumber],[ReceiverName],[ReceiverCity],[ReceiverStreet],[ReceiverPostalCode],[ReceiverHouseNumber],[ReceiverEmail],[ReceiverPhoneNumber],[SenderLogin],[DestinationId])
	VALUES (0,'golab02','S',SYSDATETIME(), null,'Tomasz Nowak','Czêstochowa','al. Wolnoœci','42-200','21b','jan.nowak@wp.pl','754562472','Joe Doe','Przemyœl','Polna','37-700','22','joedoe@gmial.com','745164258', null, 1);
INSERT INTO [dbo].[Parcels] ([ParcelStatus],[PigeonId],[ParcelTypeId],[SendDate],[ReceivedDate],[SenderName],[SenderCity],[SenderStreet],[SenderPostalCode],[SenderHouseNumber],[SenderEmail],[SenderPhoneNumber],[ReceiverName],[ReceiverCity],[ReceiverStreet],[ReceiverPostalCode],[ReceiverHouseNumber],[ReceiverEmail],[ReceiverPhoneNumber],[SenderLogin],[DestinationId])
	VALUES (0,null,'M',SYSDATETIME(), null,'Tomasz Nowak','Czêstochowa','al. Wolnoœci','42-200','21b','jan.nowak@wp.pl','754562472','Jane Doe','Przemyœl','Polna','37-700','22','janedoe@gmial.com','745164255', null, 1);

SELECT * FROM Parcels;

-- PigeonParcels

INSERT INTO PigeonParcels VALUES ('golab02',15000000);

SELECT * FROM PigeonParcels

-- WarhouseParcels

INSERT INTO WarehouseParcels VALUES (1,15000000);

SELECT * FROM WarehouseParcels

