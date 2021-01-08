USE [PPD]
GO

-- Parcel Types

INSERT INTO ParcelTypes VALUES ('S','Maksymalne wymiary:   290 x 380 x 640 mm   Minimalna wysokoœæ:   131 mm   Maksymalna waga:   25 kg',899);
INSERT INTO ParcelTypes VALUES ('M','Maksymalne wymiary:   190 x 380 x 640 mm   Minimalna wysokoœæ:   81 mm   Maksymalna waga:   25 kg',1199);
INSERT INTO ParcelTypes VALUES ('L','Maksymalne wymiary:   80 x 380 x 640 mm   Minimalna wysokoœæ:   1 mm   Maksymalna waga:   25 kg',1499);
INSERT INTO ParcelTypes VALUES ('XL','Maksymalne wymiary:   500 x 500 x 640 mm   Minimalna wysokoœæ:  191 mm   Maksymalna waga:   25 kg',1999);

SELECT * FROM ParcelTypes;

-- Warhouse

INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Czêstochowa', 50.792231, 19.184544, '6b', '42-200', 'Koksowa');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Radomsko', 51.088343, 19.383937, '1', '97-504', 'Aristide Merloniego');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Przemyœl', 49.793152, 22.720340, '338', '37-700', 'Ostrów');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Bydgoszcz', 53.129960, 18.123765, '251', '85-776', 'Brdyujœcie');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Stojad³a', 52.189059, 21.525342, '75A', '05-300', 'Warszawska');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Koszalin', 54.19223715054698, 16.13746761901745, '9', '75-202', 'Strefowa');
INSERT INTO [dbo].[Warehouses] ([City],[Latidute],[Longitude],[Number],[PostalCode],[Street])
	VALUES ('Kraków', 50.0513190240587, 20.011426023208944, '23A', '31-574', 'Ciep³ownicza');


SELECT * FROM Warehouses;

-- User - Stork

INSERT INTO Users VALUES ('bocian01','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jan.kowalski@ppd.pl','Jan','Kowalski', 2, 1, 'Stork', 1);
INSERT INTO Users VALUES ('bocian02','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jerzy.wroblewski@ppd.pl','Jerzy','Wróblewski', 2, 1,'Stork',2);
INSERT INTO Users VALUES ('bocian03','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','piotr.szymanski@ppd.pl','Piotr','Szymañski', 2, 1,'Stork',3);
INSERT INTO Users VALUES ('bocian04','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','rafal.wlodarczyk@ppd.pl','Rafa³','W³odarczyk', 2, 1,'Stork',4);
INSERT INTO Users VALUES ('bocian05','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','roksana.kwiatkowska@ppd.pl','Roksana','Kwiatkowska', 2, 1,'Stork',5);
INSERT INTO Users VALUES ('bocian06','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','magda.jaworska@ppd.pl','Magda','Jaworska', 2, 1,'Stork',6);
INSERT INTO Users VALUES ('bocian07','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','damian.andrzejewski@ppd.pl','Damian','Andrzejewski', 2, 1,'Stork',7);
INSERT INTO Users VALUES ('bocian08','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','piotr.lewandowski@ppd.pl','Piotr','Lewandowski', 2, 1,'Stork',1);
INSERT INTO Users VALUES ('bocian09','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jakub.stepien@ppd.pl','Jakub','Stêpieñ', 2, 1,'Stork',5);
INSERT INTO Users VALUES ('bocian10','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','kaja.jankowska@ppd.pl','Kaja','Jankowska', 2, 1,'Stork',3);

-- User - Pigeon

INSERT INTO Users VALUES ('golab01','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','tomasz.kucharski@ppd.pl','Tomasz','Kucharski',3, 1,'Pigeon', 1);
INSERT INTO Users VALUES ('golab02','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','joanna.wozniak@ppd.pl','Joanna','Wozniak',3, 1, 'Pigeon', 2);
INSERT INTO Users VALUES ('golab03','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','marta.sobczak@ppd.pl','Marta','Sobczak',3, 1, 'Pigeon', 3);
INSERT INTO Users VALUES ('golab04','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','emilia.krawczyk@ppd.pl','Emilia','Krawczyk',3, 1, 'Pigeon', 4);
INSERT INTO Users VALUES ('golab05','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','wioletta.lis@ppd.pl','Wioletta','Lis',3, 1, 'Pigeon', 5);
INSERT INTO Users VALUES ('golab06','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','cyprian.chmielowski@ppd.pl','Cyprian','Chmielowski',3, 1, 'Pigeon', 6);
INSERT INTO Users VALUES ('golab07','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jakub.kubiak@ppd.pl','Jakub','Kubiak',3, 1, 'Pigeon', 7);
INSERT INTO Users VALUES ('golab08','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','andrzej.szczepanski@ppd.pl','Andrzej','Szczepañski',3, 1, 'Pigeon', 1);
INSERT INTO Users VALUES ('golab09','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','edward.maciejewski@ppd.pl','Edward','Maciejewski',3, 1, 'Pigeon', 2);
INSERT INTO Users VALUES ('golab10','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','rafal.kaminski@ppd.pl','Rafa³','Kamiñski',3, 1, 'Pigeon', 3);
INSERT INTO Users VALUES ('golab11','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','jerzy.wysocki@ppd.pl','Jerzy','Wysocki',3, 1, 'Pigeon', 4);
INSERT INTO Users VALUES ('golab12','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','marcel.jaworski@ppd.pl','Marcel','Jaworski',3, 1, 'Pigeon', 5);
INSERT INTO Users VALUES ('golab13','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','dominika.stepien@ppd.pl','Dominika','Stêpieñ',3, 1, 'Pigeon', 6);
INSERT INTO Users VALUES ('golab14','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','asia.kowalczyk@ppd.pl','Asia','Kowalczyk',3, 1, 'Pigeon', 7);
INSERT INTO Users VALUES ('golab15','$2b$10$utPOAgYbr3fqDR.JvLptoOJs6Rf5jThG/fVG/luHRiGm441Rgc87y','lara.mazur@ppd.pl','Lara','Mazur',3, 1, 'Pigeon', 1);

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

