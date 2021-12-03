-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2021 a las 01:14:46
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delivery`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areaoperaciones`
--
CREATE DATABASE `delivery`;

USE `delivery`;

CREATE TABLE `areaoperaciones` (
  `AO_EFId` tinyint(2) UNSIGNED NOT NULL,
  `AO_MunicipioId` smallint(3) UNSIGNED NOT NULL DEFAULT 0,
  `AO_ParroquiaId` smallint(4) UNSIGNED NOT NULL DEFAULT 0,
  `AO_STId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `areaoperaciones`
--

INSERT INTO `areaoperaciones` (`AO_EFId`, `AO_MunicipioId`, `AO_ParroquiaId`, `AO_STId`) VALUES
(1, 1, 1, 4),
(1, 1, 1, 7),
(1, 4, 2, 4),
(1, 4, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `Contacto_Info` varchar(100) NOT NULL,
  `Contacto_Tipo` char(1) NOT NULL DEFAULT '',
  `Contacto_PersonaId` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`Contacto_Info`, `Contacto_Tipo`, `Contacto_PersonaId`) VALUES
('4126587931', 'T', 13969711),
('4167953268', 'T', 13969711),
('4242843235', 'T', 20000000),
('email@email.com', 'C', 20000000),
('4169872354', 'T', 28044244),
('4242843235', 'T', 28044244);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciondetalle`
--

CREATE TABLE `direcciondetalle` (
  `DD_Id` bigint(10) UNSIGNED ZEROFILL NOT NULL,
  `DD_Tipo` char(1) NOT NULL,
  `DD_Descripcion` varchar(500) NOT NULL,
  `DD_SEId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidadesfederales`
--

CREATE TABLE `entidadesfederales` (
  `EF_Id` tinyint(2) UNSIGNED NOT NULL,
  `EF_Nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `entidadesfederales`
--

INSERT INTO `entidadesfederales` (`EF_Id`, `EF_Nombre`) VALUES
(1, 'Distrito Capital'),
(2, 'Miranda'),
(3, 'NAN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mediotransporte`
--

CREATE TABLE `mediotransporte` (
  `MT_Id` tinyint(2) UNSIGNED NOT NULL,
  `MT_Nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mediotransporte`
--

INSERT INTO `mediotransporte` (`MT_Id`, `MT_Nombre`) VALUES
(1, 'Peaton'),
(2, 'Carro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `Municipio_Id` smallint(3) UNSIGNED NOT NULL,
  `Municipio_Nombre` varchar(45) NOT NULL,
  `Municipio_EFId` tinyint(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`Municipio_Id`, `Municipio_Nombre`, `Municipio_EFId`) VALUES
(1, 'Libertador', 1),
(4, 'NAN', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_suscripcion`
--

CREATE TABLE `pago_suscripcion` (
  `PS_Id` bigint(10) NOT NULL,
  `PS_Status` char(1) NOT NULL DEFAULT 'P',
  `PS_Fecha` date NOT NULL,
  `PS_Metodo` char(1) NOT NULL,
  `PS_Monto` decimal(6,2) NOT NULL,
  `PS_Referencia` varchar(45) DEFAULT NULL,
  `PS_ArchivoReferencia` mediumblob DEFAULT NULL,
  `PS_SuscripcionId` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pago_suscripcion`
--

INSERT INTO `pago_suscripcion` (`PS_Id`, `PS_Status`, `PS_Fecha`, `PS_Metodo`, `PS_Monto`, `PS_Referencia`, `PS_ArchivoReferencia`, `PS_SuscripcionId`) VALUES
(3, 'A', '2021-10-23', 'T', '40.00', '1584687', NULL, 7),
(5, 'A', '2021-10-23', 'T', '10.00', '8504241', NULL, 7);

--
-- Disparadores `pago_suscripcion`
--
DELIMITER $$
CREATE TRIGGER `Pago_Suscripcion_AFTER_UPDATE` AFTER UPDATE ON `pago_suscripcion` FOR EACH ROW BEGIN
DECLARE PagosTotal DECIMAL(12,2);
	DECLARE SuscripcionMonto DECIMAL(6,2);
	SET PagosTotal = 0;
	SET SuscripcionMonto = 0;
	SELECT SUM(PS_Monto) INTO PagosTotal FROM pago_suscripcion WHERE PS_Status = 'A';
	SELECT Suscripcion_Monto INTO SuscripcionMonto FROM suscripcion WHERE Suscripcion_Id = NEW.PS_SuscripcionId;
	if PagosTotal >= SuscripcionMonto then
		UPDATE suscripcion SET Suscripcion_Status = 'S'
		WHERE Suscripcion_Id = NEW.PS_SuscripcionId;
	ELSE 
		UPDATE suscripcion SET Suscripcion_Status = 'P'
		WHERE Suscripcion_Id = NEW.PS_SuscripcionId;
	END If;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parroquias`
--

CREATE TABLE `parroquias` (
  `Parroquia_Id` smallint(4) UNSIGNED NOT NULL,
  `Parroquia_Nombre` varchar(45) NOT NULL,
  `Parroquia_MunicipioId` smallint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `parroquias`
--

INSERT INTO `parroquias` (`Parroquia_Id`, `Parroquia_Nombre`, `Parroquia_MunicipioId`) VALUES
(1, 'Sucre', 1),
(2, 'NAN', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `Persona_Id` int(9) UNSIGNED NOT NULL,
  `Persona_TipoId` char(1) NOT NULL,
  `Persona_Nombre` varchar(100) NOT NULL,
  `Persona_Apellido` varchar(70) NOT NULL,
  `Persona_Status` char(1) NOT NULL DEFAULT 'N',
  `Persona_Archivo` mediumblob DEFAULT NULL COMMENT 'Archivo del documento de identidad'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`Persona_Id`, `Persona_TipoId`, `Persona_Nombre`, `Persona_Apellido`, `Persona_Status`, `Persona_Archivo`) VALUES
(13969711, 'v', 'Jose Carlos', 'Ramirez', 'N', NULL),
(20000000, 'V', 'Charles', 'Martin', 'N', NULL),
(25449375, 'v', 'Jeferson ', 'Perez', 'N', NULL),
(27888244, 'V', 'Example2', 'rasm', 'N', NULL),
(28044244, 'V', 'Example', 'rasm', 'N', NULL),
(28777277, 'V', 'Ubaldo', 'PEREZ', 'N', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Producto_Id` smallint(5) UNSIGNED NOT NULL,
  `Producto_Nombre` varchar(45) NOT NULL,
  `Producto_Tipo` varchar(45) NOT NULL,
  `Producto_Tamano` decimal(4,2) NOT NULL,
  `Producto_Peso` decimal(5,2) NOT NULL,
  `Producto_Precio` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Producto_Id`, `Producto_Nombre`, `Producto_Tipo`, `Producto_Tamano`, `Producto_Peso`, `Producto_Precio`) VALUES
(1, 'Harina Pan', 'Harinas', '20.00', '1.00', '1.00'),
(2, 'Res', 'Carnes', '20.00', '1.50', '10.00'),
(3, 'pab', 'd', '2.00', '2.00', '2.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_has_se`
--

CREATE TABLE `producto_has_se` (
  `ProductoSE_ProductoId` smallint(5) UNSIGNED NOT NULL,
  `ProductoSE_SEId` int(10) UNSIGNED NOT NULL,
  `ProductoSE_Cantidad` smallint(4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto_has_se`
--

INSERT INTO `producto_has_se` (`ProductoSE_ProductoId`, `ProductoSE_SEId`, `ProductoSE_Cantidad`) VALUES
(1, 8, 3),
(1, 11, 5),
(1, 14, 1),
(2, 8, 3),
(2, 11, 5),
(2, 14, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serviciotransporte`
--

CREATE TABLE `serviciotransporte` (
  `ST_Id` int(10) UNSIGNED NOT NULL,
  `ST_HorarioIni` time NOT NULL,
  `ST_HorarioFin` time NOT NULL,
  `ST_Precio` decimal(6,2) NOT NULL,
  `ST_Status` char(1) NOT NULL DEFAULT 'D',
  `ST_Descripcion` varchar(500) NOT NULL,
  `ST_MTId` tinyint(2) UNSIGNED NOT NULL,
  `ST_PersonaId` int(9) UNSIGNED NOT NULL,
  `ST_VehiculoId` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `serviciotransporte`
--

INSERT INTO `serviciotransporte` (`ST_Id`, `ST_HorarioIni`, `ST_HorarioFin`, `ST_Precio`, `ST_Status`, `ST_Descripcion`, `ST_MTId`, `ST_PersonaId`, `ST_VehiculoId`) VALUES
(4, '11:45:57', '23:46:03', '30.00', 'D', 'Example', 1, 28044244, 2),
(7, '09:00:00', '17:00:00', '30.00', 'D', 'Example 2', 1, 13969711, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `se_has_st`
--

CREATE TABLE `se_has_st` (
  `SEST_SEId` int(10) UNSIGNED NOT NULL,
  `SEST_STId` int(10) UNSIGNED NOT NULL,
  `SEST_Status` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `se_has_st`
--

INSERT INTO `se_has_st` (`SEST_SEId`, `SEST_STId`, `SEST_Status`) VALUES
(8, 4, 'A'),
(11, 4, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesenvio`
--

CREATE TABLE `solicitudesenvio` (
  `SE_Id` int(10) UNSIGNED NOT NULL,
  `SE_Fecha` date NOT NULL,
  `SE_Status` char(1) NOT NULL DEFAULT 'D',
  `SE_ValorTotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `SE_PesoTotal` decimal(6,2) NOT NULL DEFAULT 0.00,
  `SE_PersonaId` int(9) UNSIGNED NOT NULL,
  `SE_ParroquiaId` smallint(4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `solicitudesenvio`
--

INSERT INTO `solicitudesenvio` (`SE_Id`, `SE_Fecha`, `SE_Status`, `SE_ValorTotal`, `SE_PesoTotal`, `SE_PersonaId`, `SE_ParroquiaId`) VALUES
(8, '1999-09-25', '1', '33.00', '7.50', 13969711, 1),
(11, '2012-09-25', '1', '55.00', '12.50', 25449375, 1),
(14, '2020-05-01', 'D', '20.00', '20.00', 20000000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `Suscripcion_Id` bigint(10) NOT NULL,
  `Suscripcion_Status` char(1) NOT NULL DEFAULT 'P',
  `Suscripcion_Monto` decimal(6,2) NOT NULL,
  `Suscripcion_FechaI` date DEFAULT NULL,
  `Suscripcion_FechaV` date DEFAULT NULL,
  `Suscripcion_PersonaId` int(9) UNSIGNED NOT NULL,
  `Suscripcion_TSId` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`Suscripcion_Id`, `Suscripcion_Status`, `Suscripcion_Monto`, `Suscripcion_FechaI`, `Suscripcion_FechaV`, `Suscripcion_PersonaId`, `Suscripcion_TSId`) VALUES
(7, 'S', '50.00', '2021-10-19', '2021-11-19', 28044244, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_suscripcion`
--

CREATE TABLE `tipo_suscripcion` (
  `TS_Id` tinyint(1) NOT NULL,
  `TS_Nombre` varchar(45) NOT NULL,
  `TS_Status` char(1) NOT NULL DEFAULT 'B',
  `TS_Monto` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_suscripcion`
--

INSERT INTO `tipo_suscripcion` (`TS_Id`, `TS_Nombre`, `TS_Status`, `TS_Monto`) VALUES
(1, 'basico', 'A', '50.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Usuario_Id` int(9) UNSIGNED NOT NULL,
  `Usuario_Correo` varchar(100) NOT NULL,
  `Usuario_Clave` varchar(100) NOT NULL,
  `Usuario_Permisos` char(1) NOT NULL DEFAULT 'C',
  `Usuario_Status` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Usuario_Id`, `Usuario_Correo`, `Usuario_Clave`, `Usuario_Permisos`, `Usuario_Status`) VALUES
(27888244, 'carrera25@gmail.com', '$2a$10$me782ds0bfjC6Mpx5sOUgODYZobhKSfmUefxcmwOn3agREU1PTOCC', 'C', 'A'),
(28044244, 'jesuscarrera25@gmail.com', '$2a$10$RLCxWEGsFRmIHKO4AweXyOIMRVf3MrcaAJlkDxyQ/bVKp0DJE/M1G', 'A', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `Valoracion_Id` int(10) UNSIGNED NOT NULL,
  `Valoracion_Puntuacion` tinyint(2) NOT NULL,
  `Valoracion_Comentario` varchar(500) NOT NULL,
  `Valoracion_PersonaId` int(9) UNSIGNED NOT NULL,
  `Valoracion_ST_Id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `Vehiculo_Id` int(10) UNSIGNED NOT NULL,
  `Vehiculo_Matricula` varchar(7) NOT NULL,
  `Vehiculo_Marca` varchar(45) NOT NULL,
  `Vehiculo_Modelo` varchar(45) NOT NULL,
  `Vehiculo_Anio` year(4) NOT NULL,
  `Vehiculo_Pasajeros` tinyint(2) NOT NULL,
  `Vehiculo_CapacidadCarga` decimal(6,2) NOT NULL,
  `Vehiculo_PersonaId` int(9) UNSIGNED NOT NULL,
  `Vehiculo_MTId` tinyint(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`Vehiculo_Id`, `Vehiculo_Matricula`, `Vehiculo_Marca`, `Vehiculo_Modelo`, `Vehiculo_Anio`, `Vehiculo_Pasajeros`, `Vehiculo_CapacidadCarga`, `Vehiculo_PersonaId`, `Vehiculo_MTId`) VALUES
(2, '2xxxxxx', 'Ford', 'Fiesta', 2021, 5, '99.99', 28044244, 2),
(4, 'xxxxxxx', 'Hyundai', 'Uno', 2021, 5, '50.00', 28044244, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areaoperaciones`
--
ALTER TABLE `areaoperaciones`
  ADD PRIMARY KEY (`AO_EFId`,`AO_MunicipioId`,`AO_ParroquiaId`,`AO_STId`),
  ADD KEY `fk_AreaOperaciones_EntidadesFederales1_idx` (`AO_EFId`),
  ADD KEY `fk_AreaOperaciones_Municipios1_idx` (`AO_MunicipioId`),
  ADD KEY `fk_AreaOperaciones_Parroquias1_idx` (`AO_ParroquiaId`),
  ADD KEY `fk_AreaOperaciones_ServicioTransporte1_idx` (`AO_STId`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`Contacto_PersonaId`,`Contacto_Info`);

--
-- Indices de la tabla `direcciondetalle`
--
ALTER TABLE `direcciondetalle`
  ADD PRIMARY KEY (`DD_Id`,`DD_SEId`),
  ADD KEY `fk_DireccionDetalle_SolicitudesEnvioProductos1_idx` (`DD_SEId`);

--
-- Indices de la tabla `entidadesfederales`
--
ALTER TABLE `entidadesfederales`
  ADD PRIMARY KEY (`EF_Id`);

--
-- Indices de la tabla `mediotransporte`
--
ALTER TABLE `mediotransporte`
  ADD PRIMARY KEY (`MT_Id`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`Municipio_Id`),
  ADD KEY `FK_Municipio_EntidadF_idx` (`Municipio_EFId`);

--
-- Indices de la tabla `pago_suscripcion`
--
ALTER TABLE `pago_suscripcion`
  ADD PRIMARY KEY (`PS_Id`),
  ADD KEY `fk_Pago_Suscripcion_Suscripcion1_idx` (`PS_SuscripcionId`);

--
-- Indices de la tabla `parroquias`
--
ALTER TABLE `parroquias`
  ADD PRIMARY KEY (`Parroquia_Id`),
  ADD KEY `FK_Parroquia_Municipio_idx` (`Parroquia_MunicipioId`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`Persona_Id`),
  ADD UNIQUE KEY `Cedula_UNIQUE` (`Persona_Id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Producto_Id`),
  ADD UNIQUE KEY `idProductos_UNIQUE` (`Producto_Id`);

--
-- Indices de la tabla `producto_has_se`
--
ALTER TABLE `producto_has_se`
  ADD PRIMARY KEY (`ProductoSE_ProductoId`,`ProductoSE_SEId`),
  ADD KEY `fk_Productos_has_SolicitudesEnvio_SolicitudesEnvio1_idx` (`ProductoSE_SEId`),
  ADD KEY `fk_Productos_has_SolicitudesEnvio_Productos1_idx` (`ProductoSE_ProductoId`);

--
-- Indices de la tabla `serviciotransporte`
--
ALTER TABLE `serviciotransporte`
  ADD PRIMARY KEY (`ST_Id`),
  ADD UNIQUE KEY `ST_Id_UNIQUE` (`ST_Id`),
  ADD KEY `fk_ServicioTransporte_MedioTransporte1_idx` (`ST_MTId`),
  ADD KEY `fk_ServicioTransporte_Personas1_idx` (`ST_PersonaId`),
  ADD KEY `fk_ServicioTransporte_Vehiculos1_idx` (`ST_VehiculoId`);

--
-- Indices de la tabla `se_has_st`
--
ALTER TABLE `se_has_st`
  ADD PRIMARY KEY (`SEST_SEId`,`SEST_STId`),
  ADD KEY `fk_SolicitudesEnvioProductos_has_ServicioTransporte_Servici_idx` (`SEST_STId`),
  ADD KEY `fk_SolicitudesEnvioProductos_has_ServicioTransporte_Solicit_idx` (`SEST_SEId`);

--
-- Indices de la tabla `solicitudesenvio`
--
ALTER TABLE `solicitudesenvio`
  ADD PRIMARY KEY (`SE_Id`),
  ADD UNIQUE KEY `idSolicitudesEnvioProductos_UNIQUE` (`SE_Id`),
  ADD KEY `fk_SolicitudesEnvioProductos_Personas1_idx` (`SE_PersonaId`),
  ADD KEY `fk_SolicitudesEnvio_Parroquias1_idx` (`SE_ParroquiaId`);

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`Suscripcion_Id`),
  ADD KEY `fk_Suscripcion_Personas1_idx` (`Suscripcion_PersonaId`),
  ADD KEY `fk_Suscripcion_Tipo_Suscripcion1_idx` (`Suscripcion_TSId`);

--
-- Indices de la tabla `tipo_suscripcion`
--
ALTER TABLE `tipo_suscripcion`
  ADD PRIMARY KEY (`TS_Id`),
  ADD UNIQUE KEY `idPagoFianza_UNIQUE` (`TS_Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Usuario_Id`),
  ADD UNIQUE KEY `idUsuarios_UNIQUE` (`Usuario_Id`),
  ADD UNIQUE KEY `Usuario_Correo_UNIQUE` (`Usuario_Correo`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`Valoracion_Id`),
  ADD UNIQUE KEY `idValoracion_UNIQUE` (`Valoracion_Id`),
  ADD KEY `fk_Valoracion_por_Servicio_Personas1_idx` (`Valoracion_PersonaId`),
  ADD KEY `fk_Valoracion_ServicioTransporte1_idx` (`Valoracion_ST_Id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`Vehiculo_Id`),
  ADD UNIQUE KEY `Vehiculo_Matricula_UNIQUE` (`Vehiculo_Matricula`),
  ADD KEY `fk_Vehiculos_Personas1_idx` (`Vehiculo_PersonaId`),
  ADD KEY `fk_Vehiculos_MedioTransporte1_idx` (`Vehiculo_MTId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entidadesfederales`
--
ALTER TABLE `entidadesfederales`
  MODIFY `EF_Id` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `Municipio_Id` smallint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pago_suscripcion`
--
ALTER TABLE `pago_suscripcion`
  MODIFY `PS_Id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Producto_Id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `serviciotransporte`
--
ALTER TABLE `serviciotransporte`
  MODIFY `ST_Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  MODIFY `Suscripcion_Id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `Valoracion_Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `Vehiculo_Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `areaoperaciones`
--
ALTER TABLE `areaoperaciones`
  ADD CONSTRAINT `fk_AreaOperaciones_EntidadesFederales1` FOREIGN KEY (`AO_EFId`) REFERENCES `entidadesfederales` (`EF_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AreaOperaciones_Municipios1` FOREIGN KEY (`AO_MunicipioId`) REFERENCES `municipios` (`Municipio_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AreaOperaciones_Parroquias1` FOREIGN KEY (`AO_ParroquiaId`) REFERENCES `parroquias` (`Parroquia_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AreaOperaciones_ServicioTransporte1` FOREIGN KEY (`AO_STId`) REFERENCES `serviciotransporte` (`ST_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `FK_Persona_Id` FOREIGN KEY (`Contacto_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `direcciondetalle`
--
ALTER TABLE `direcciondetalle`
  ADD CONSTRAINT `fk_DireccionDetalle_SolicitudesEnvioProductos1` FOREIGN KEY (`DD_SEId`) REFERENCES `solicitudesenvio` (`SE_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `FK_Municipio_EntidadF` FOREIGN KEY (`Municipio_EFId`) REFERENCES `entidadesfederales` (`EF_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pago_suscripcion`
--
ALTER TABLE `pago_suscripcion`
  ADD CONSTRAINT `fk_Pago_Suscripcion_Suscripcion1` FOREIGN KEY (`PS_SuscripcionId`) REFERENCES `suscripcion` (`Suscripcion_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parroquias`
--
ALTER TABLE `parroquias`
  ADD CONSTRAINT `FK_Parroquia_Municipio` FOREIGN KEY (`Parroquia_MunicipioId`) REFERENCES `municipios` (`Municipio_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto_has_se`
--
ALTER TABLE `producto_has_se`
  ADD CONSTRAINT `fk_Productos_has_SolicitudesEnvio_Productos1` FOREIGN KEY (`ProductoSE_ProductoId`) REFERENCES `productos` (`Producto_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Productos_has_SolicitudesEnvio_SolicitudesEnvio1` FOREIGN KEY (`ProductoSE_SEId`) REFERENCES `solicitudesenvio` (`SE_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `serviciotransporte`
--
ALTER TABLE `serviciotransporte`
  ADD CONSTRAINT `fk_ServicioTransporte_MedioTransporte1` FOREIGN KEY (`ST_MTId`) REFERENCES `mediotransporte` (`MT_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ServicioTransporte_Personas1` FOREIGN KEY (`ST_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ServicioTransporte_Vehiculos1` FOREIGN KEY (`ST_VehiculoId`) REFERENCES `vehiculos` (`Vehiculo_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `se_has_st`
--
ALTER TABLE `se_has_st`
  ADD CONSTRAINT `fk_SolicitudesEnvioProductos_has_ServicioTransporte_ServicioT1` FOREIGN KEY (`SEST_STId`) REFERENCES `serviciotransporte` (`ST_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_SolicitudesEnvioProductos_has_ServicioTransporte_Solicitud1` FOREIGN KEY (`SEST_SEId`) REFERENCES `solicitudesenvio` (`SE_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudesenvio`
--
ALTER TABLE `solicitudesenvio`
  ADD CONSTRAINT `fk_SolicitudesEnvioProductos_Personas1` FOREIGN KEY (`SE_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_SolicitudesEnvio_Parroquias1` FOREIGN KEY (`SE_ParroquiaId`) REFERENCES `parroquias` (`Parroquia_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `fk_Suscripcion_Personas1` FOREIGN KEY (`Suscripcion_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Suscripcion_Tipo_Suscripcion1` FOREIGN KEY (`Suscripcion_TSId`) REFERENCES `tipo_suscripcion` (`TS_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_Usuario_Persona` FOREIGN KEY (`Usuario_Id`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `fk_Valoracion_Persona` FOREIGN KEY (`Valoracion_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Valoracion_ServicioTransporte1` FOREIGN KEY (`Valoracion_ST_Id`) REFERENCES `serviciotransporte` (`ST_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_Vehiculos_MedioTransporte1` FOREIGN KEY (`Vehiculo_MTId`) REFERENCES `mediotransporte` (`MT_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Vehiculos_Personas1` FOREIGN KEY (`Vehiculo_PersonaId`) REFERENCES `personas` (`Persona_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
