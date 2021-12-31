import React, { useContext, useEffect, useState } from "react";

/* Material UI */
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Input,
  Fade,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  Stack,
  Grid,
  Badge,
  Chip,
  Tooltip,
  MenuItem,
  Alert,
  DialogActions,
  Collapse,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InputMask from "react-input-mask";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";
import {
  GetOneShippmentToEdit,
  GetProducts,
  GetUbication,
} from "../../../api/Get";
import { areaCodes } from "../../../areaCodes";
import { PostEnvio } from "../../../api/Post";
import { OpenEditContext } from "../../../context/openEditContext";
import { PutEnvio } from "../../../api/Put";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

const CustomStack = (props) => {
  return (
    <Stack
      {...props}
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ padding: "1rem 0" }}
    >
      {props.children}
    </Stack>
  );
};
const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;
  const firstLetter = /^(424|212)$/;
  const letter = /(?!.*[DFIOQU])[A-Z]/i;
  const digit = /[0-9]/;
  const mask = ["(", , digit, letter, " ", digit, letter, digit];
  return (
    <InputMask
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      maskChar={null}
      placeholderChar={"\u2000"}
    />
  );
};

function Add() {
  const {
    openEditShippment,
    setOpenEditShippment,
    shippmentToEdit,
    setShippmentToEdit,
  } = useContext(OpenEditContext);

  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [products, setProducts] = useState([]);

  const [productsTypes, setProductsTypes] = useState([]);
  const [loadingProductsTypes, setLoadingProductsTypes] = useState(false);
  const [productType, setProductType] = useState("");
  const [productTypeInput, setProductTypeInput] = useState("");

  const [productsList, setProductsList] = useState([]);
  const [loadingProductsList, setLoadingProductsList] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [productSelectedInput, setProductSelectedInput] = useState("");

  const [federalEntities, setFederalEntities] = useState([]);
  const [federalEntity, setFederalEntity] = useState("");
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [parish, setParish] = useState("");
  const [loadingParishes, setLoadingParishes] = useState(false);

  const [contact_type, setContact_type] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [contactList, setContactList] = useState([]);

  const [shippmentDetails, setShippmentDetails] = useState({
    Persona_TipoId: "V",
  });

  const [shippmentStatusList, setShippmentStatusList] = useState([
    { letter: "E", name: "Eliminado" },
    { letter: "P", name: "Pendiente de servicio transporte" },
    { letter: "S", name: "Servicio de transporte activo" },
    { letter: "T", name: "Producto entregado al transportista" },
    { letter: "C", name: "Producto entregado al cliente" },
    { letter: "F", name: "Transporte finalizado con exito" },
    { letter: "X", name: "Problemas con el transporte" },
  ]);

  const getFederalEntities = () => {
    setLoadingFederalEntities(true);
    GetUbication("federal_entity").then((res) => {
      setFederalEntities(res);
      setLoadingFederalEntities(false);
    });
  };

  const getMunicipities = (federal_entity) => {
    if (!federal_entity) return;
    setLoadingMunicipalities(true);
    GetUbication("municipality", federal_entity).then((res) => {
      setMunicipalities(res);
      setLoadingMunicipalities(false);
    });
  };

  const getParishes = (municipality) => {
    if (!municipality) return;
    setLoadingParishes(true);
    GetUbication("parish", null, municipality).then((res) => {
      setParishes(res);
      setLoadingParishes(false);
    });
  };

  const getProductsTypes = async () => {
    if (productsTypes && productsTypes.length > 0) return;
    setLoadingProductsTypes(true);
    let prod = await GetProducts("type_product");
    setProductsTypes(prod);
    setLoadingProductsTypes(false);
  };

  const getProductsList = async (type_product) => {
    if (productsList && productsList.length > 0) return;
    setLoadingProductsList(true);
    let prod = await GetProducts("product", type_product);
    setProductsList(prod);
    setLoadingProductsList(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEditShippment(false);
  };

  const handleClickOpenFile = () => {
    setOpenFile(true);
  };

  const handleCloseFile = () => {
    setOpenFile(false);
  };

  const handleFederalEntityChange = (e) => {
    setFederalEntity(e.target.value);
    setMunicipalities([]);
    setMunicipality("");
    setParishes([]);
    setParish("");
    setShippmentDetails({
      ...shippmentDetails,
      SE_ParroquiaId: undefined,
    });
  };

  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
    setParishes([]);
    setParish("");
    setShippmentDetails({
      ...shippmentDetails,
      SE_ParroquiaId: undefined,
    });
  };

  const handleParishChange = (e) => {
    setParish(e.target.value);
    setShippmentDetails({
      ...shippmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippmentChange = (e) => {
    setShippmentDetails({
      ...shippmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactTypeChange = (e) => {
    setContact_type(e.target.value);
  };

  const handleContactInfoChange = (e) => {
    setContactInfo(e.target.value);
  };
  const handleAddContact = (e) => {
    if (!contact_type || !contactInfo) return;
    if (
      contact_type === "C" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contactInfo)
    )
      return;
    if (
      contact_type === "T" &&
      (!areaCodes.includes(parseInt(contactInfo.split(/[()]/)[1], 10)) ||
        contactInfo.includes("_"))
    )
      return;
    let contactListCheck = [...contactList];
    if (contactListCheck.findIndex((c) => c.contactInfo === contactInfo) > -1) {
      setContact_type("");
      setContactInfo("");
      return;
    }
    contactListCheck.push({
      contact_type,
      contactInfo,
    });
    setContactList(contactListCheck);
    setContact_type("");
    setContactInfo("");
  };

  const handleDeleteContact = (i) => {
    let contactListCheck = [...contactList];
    contactListCheck.splice(i, 1);
    setContactList(contactListCheck);
  };

  const handleDeleteAllContacts = () => {
    setContactList([]);
  };

  const handleAddProduct = (e) => {
    let value = document.getElementsByName("ProductoSE_Cantidad")[0].value;
    if (value < 1) return;
    if (!productSelected.Producto_Nombre) return;
    let product = {
      ...productSelected,
      ProductoSE_Cantidad: value,
    };
    let productsCheck = [...products];
    let index = productsCheck.findIndex(
      (p) => p.Producto_Id === product.Producto_Id
    );
    if (index === -1) {
      productsCheck.push(product);
    } else {
      productsCheck[index].ProductoSE_Cantidad = value;
    }
    setProducts(productsCheck);
    setShippmentDetails({
      ...shippmentDetails,
      SE_PesoTotal: productsCheck.reduce(
        (acc, cur) => acc + cur.Producto_Peso * cur.ProductoSE_Cantidad,
        0
      ),
      SE_ValorTotal: productsCheck.reduce(
        (acc, cur) => acc + cur.Producto_Precio * cur.ProductoSE_Cantidad,
        0
      ),
    });
    setProductSelected({});
    document.getElementsByName("ProductoSE_Cantidad")[0].value = "";
  };

  const handleDeleteAllProducts = () => {
    setProducts([]);
    setShippmentDetails({
      ...shippmentDetails,
      SE_PesoTotal: 0,
      SE_ValorTotal: 0,
    });
  };

  const handleDeleteProduct = (index) => {
    let productsCheck = [...products];
    productsCheck.splice(index, 1);
    setProducts(productsCheck);
    setShippmentDetails({
      ...shippmentDetails,
      SE_PesoTotal: productsCheck.reduce(
        (acc, cur) => acc + cur.Producto_Peso * cur.quantity,
        0
      ),
      SE_ValorTotal: productsCheck.reduce(
        (acc, cur) => acc + cur.Producto_Precio * cur.quantity,
        0
      ),
    });
  };

  const handleSubmitShippment = (e) => {
    e.preventDefault();
    setSending(true);
    if (products.length === 0) {
      setErrorMessage("Debe seleccionar al menos un producto");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (contactList.length === 0) {
      setErrorMessage("Debe ingresar al menos un contacto");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["Persona_TipoId"]) {
      setErrorMessage("Debe ingresar el tipo de cédula");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["Persona_Id"]) {
      setErrorMessage("Debe ingresar la cédula");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["Persona_Nombre"]) {
      setErrorMessage("Debe ingresar el nombre");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["Persona_Apellido"]) {
      setErrorMessage("Debe ingresar el apellido");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["SE_Id"]) {
      setErrorMessage("Debe ingresar el número del envío");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["SE_Fecha"]) {
      setErrorMessage("Debe ingresar la fecha del envío");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["SE_Status"]) {
      setErrorMessage("Debe ingresar el estado del envío");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!shippmentDetails["SE_ParroquiaId"]) {
      setErrorMessage("Debe ingresar la parroquia del envío");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }

    let productsList = [];

    products.forEach((product) => {
      productsList.push([
        product.Producto_Id,
        shippmentDetails["SE_Id"],
        product.ProductoSE_Cantidad,
      ]);
    });

    let ContactInformation = [];

    contactList.forEach((contact) => {
      ContactInformation.push([
        contact.contactInfo,
        contact.contact_type,
        shippmentDetails["Persona_Id"],
      ]);
    });

    setShippmentDetails({
      ...shippmentDetails,
      productsList,
      ContactInformation,
    });
  };

  useEffect(() => {
    if (!sending) return;
    let { productsList, ContactInformation } = shippmentDetails;
    if (
      !productsList ||
      !ContactInformation ||
      productsList.length === 0 ||
      ContactInformation.length === 0
    ) {
      setSending(false);
      return;
    }
    if (openEditShippment && shippmentToEdit) {
      (async function () {
        try {
          const response = await PutEnvio(shippmentToEdit, shippmentDetails);
          if (response.status === 200) {
            setSuccessMessage("Envío editado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Envios"
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al editar el envío, puede que el ID ya exista"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        } catch (e) {
          if (e) {
            setErrorMessage(
              "Hubo un error al enviar los datos"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        }
      })();
    } else {
      (async function () {
        try {
          const response = await PostEnvio(shippmentDetails);
          if (response.status === 200) {
            setSuccessMessage("Envío creado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Envios"
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al crear el envío, puede que el ID ya exista"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        } catch (e) {
          if (e) {
            setErrorMessage(
              "Hubo un error al enviar los datos"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        }
      })();
    }
  }, [shippmentDetails]);

  useEffect(async () => {
    if (!shippmentToEdit || !openEditShippment) return;
    try {
      setLoading(true);
      let shippmentDetails = await GetOneShippmentToEdit(shippmentToEdit);
      await setShippmentDetails(shippmentDetails);
      await getFederalEntities(shippmentDetails.EF_Id);
      await setFederalEntity(() => {
        return shippmentDetails.EF_Id;
      });
      await getMunicipities(shippmentDetails.EF_Id);
      await setMunicipality(() => {
        return shippmentDetails.Municipio_Id;
      });
      await getParishes(shippmentDetails.Municipio_Id);
      await setParish(() => {
        return shippmentDetails.Parroquia_Id;
      });
      await setProducts(() => {
        return shippmentDetails.productsList;
      });
      await setContactList(() => {
        return shippmentDetails.contactInfo;
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setErrorMessage("Hubo un error al obtener los datos del envío");
      setTimeout(() => {
        setErrorMessage("");
        setOpenEditShippment(false);
        setLoading(false);
      }, 3000);
    }
  }, [shippmentToEdit, openEditShippment]);

  useEffect(() => {
    if (shippmentToEdit && open) {
      setShippmentDetails({
        Persona_TipoId: "V",
      });
      setShippmentToEdit("");
      setFederalEntity("");
      setMunicipality("");
      setParish("");
      setProducts([]);
      setContactList([]);
    }
  }, [shippmentToEdit, open]);

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon color="primary" />
      </IconButton>
      <Dialog
        open={open || openEditShippment}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        onClose={handleClose}
        component="form"
      >
        <Collapse in={errorMessage}>
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Collapse>
        <Collapse in={successMessage}>
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        </Collapse>
        <DialogTitle>
          {openEditShippment && shippmentToEdit
            ? "Edición del Envío"
            : "Creación de Envío"}
        </DialogTitle>
        {loading ? (
          <Box
            sx={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner loading={loading} />
          </Box>
        ) : (
          <>
            <DialogContent>
              <DialogContentText
                sx={{
                  display: "flex",
                  alignContent: "center",
                  gap: "1rem",
                  margin: "1rem 0",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ flexGrow: 1 }}
                >
                  Por favor, ingrese los datos del envío.
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Tooltip
                  title="Proximamente estara disponible la opcion de archivo"
                  arrow
                >
                  <span>
                    <IconButton disabled onClick={handleClickOpenFile}>
                      <UploadFileTwoToneIcon size="large" />
                    </IconButton>
                  </span>
                </Tooltip>
              </DialogContentText>

              <CustomStack>
                <TextField
                  id="Persona_TipoId"
                  name="Persona_TipoId"
                  select
                  label="Tipo"
                  value={shippmentDetails && shippmentDetails.Persona_TipoId}
                  onChange={handleShippmentChange}
                  variant="filled"
                >
                  {["V", "E", "J"].map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Cédula o RIF de la persona"
                  variant="filled"
                  type="number"
                  id="Persona_Id"
                  name="Persona_Id"
                  onChange={handleShippmentChange}
                  value={
                    (shippmentDetails && shippmentDetails.Persona_Id) || ""
                  }
                  {...(shippmentDetails &&
                    shippmentDetails.Persona_Id && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                />
              </CustomStack>
              <CustomStack>
                <TextField
                  id="Persona_Nombre"
                  name="Persona_Nombre"
                  label="Nombres"
                  value={
                    (shippmentDetails && shippmentDetails.Persona_Nombre) || ""
                  }
                  onChange={handleShippmentChange}
                  variant="filled"
                  {...(shippmentDetails &&
                    shippmentDetails.Persona_Nombre && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                />
                <TextField
                  id="Persona_Apellido"
                  name="Persona_Apellido"
                  label="Apellidos"
                  value={
                    (shippmentDetails && shippmentDetails.Persona_Apellido) ||
                    ""
                  }
                  onChange={handleShippmentChange}
                  variant="filled"
                  {...(shippmentDetails &&
                    shippmentDetails.Persona_Apellido && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                />
              </CustomStack>
              {/* Contact Information */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ padding: "1rem 0" }}
              >
                <TextField
                  id="contact_type"
                  name="contact_type"
                  select
                  label="Tipo de contacto"
                  value={contact_type && contact_type}
                  onChange={handleContactTypeChange}
                  variant="filled"
                  sx={{ minWidth: 170 }}
                >
                  {[
                    { letter: "C", name: "Correo" },
                    { letter: "T", name: "Teléfono" },
                  ].map((tipo) => (
                    <MenuItem key={tipo.letter} value={tipo.letter}>
                      {tipo.name}
                    </MenuItem>
                  ))}
                </TextField>
                {contact_type === "C" && (
                  <TextField
                    label="Correo Electrónico"
                    variant="filled"
                    type="email"
                    id="contactInfo"
                    name="contactInfo"
                    onChange={handleContactInfoChange}
                    {...(contactInfo &&
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        contactInfo
                      ) && {
                        error: true,
                        helperText: "Correo electrónico inválido",
                      })}
                    fullWidth
                  />
                )}
                {contact_type === "T" && (
                  <TextField
                    id="contactInfo"
                    name="contactInfo"
                    label="Número de teléfono"
                    margin="normal"
                    variant="filled"
                    InputProps={{
                      inputComponent: TextMaskCustom,
                      onChange: handleContactInfoChange,
                    }}
                    {...((contactInfo &&
                      !areaCodes.includes(
                        parseInt(contactInfo.split(/[()]/)[1], 10)
                      ) && {
                        error: true,
                        helperText: "Código de área inválido",
                      }) ||
                      (contactInfo &&
                        contactInfo.includes("_") && {
                          error: true,
                          helperText: "Número de teléfono inválido",
                        }))}
                  />
                )}
                <IconButton>
                  <AddCircleTwoToneIcon
                    size="large"
                    onClick={handleAddContact}
                    color="primary"
                  />
                </IconButton>
              </Stack>
              <Box
                sx={{
                  gap: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: ".7rem",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    gap: "1rem",
                    display: "flex",
                    margin: ".7rem",
                  }}
                >
                  <Typography variant="subtitle2" component="h3">
                    Información de contacto agregada al envío
                  </Typography>
                  <Badge
                    badgeContent={contactList && contactList.length}
                    color="primary"
                  />
                </Box>
                <Chip
                  label="Vaciar contactos"
                  onClick={handleDeleteAllContacts}
                />
              </Box>
              <Grid
                sx={{ margin: "1rem auto", flexWrap: "wrap", gap: ".3rem" }}
                container
              >
                {contactList &&
                  contactList.map((contact, index) => {
                    return (
                      <Chip
                        label={`${contact.contactInfo}`}
                        key={`${index}`}
                        deleteIcon={<DeleteTwoToneIcon />}
                        variant="outlined"
                        onDelete={() => handleDeleteContact(index)}
                      />
                    );
                  })}
              </Grid>
              {/* Shippment Information */}
              <CustomStack>
                <TextField
                  label="Id del Envío"
                  variant="filled"
                  type="number"
                  id="SE_Id"
                  name="SE_Id"
                  fullWidth
                  onChange={handleShippmentChange}
                  value={(shippmentDetails && shippmentDetails.SE_Id) || ""}
                  {...(shippmentDetails &&
                    shippmentDetails.SE_Id && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                />
              </CustomStack>
              <CustomStack>
                <TextField
                  id="SE_Fecha"
                  name="SE_Fecha"
                  label="Fecha del Pedido"
                  type="date"
                  variant="filled"
                  color="primary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleShippmentChange}
                  value={
                    (shippmentDetails &&
                      shippmentDetails.SE_Fecha &&
                      shippmentDetails.SE_Fecha.split("T")[0]) ||
                    ""
                  }
                  fullWidth
                />
                <TextField
                  id="SE_Status"
                  name="SE_Status"
                  select
                  label="Estado del Envío"
                  value={(shippmentDetails && shippmentDetails.SE_Status) || ""}
                  onChange={handleShippmentChange}
                  variant="filled"
                  fullWidth
                >
                  {shippmentStatusList.map((status) => (
                    <MenuItem key={status.letter} value={status.letter}>
                      {status.name}
                    </MenuItem>
                  ))}
                </TextField>
              </CustomStack>
              <CustomStack>
                <TextField
                  id="federal_entity"
                  select
                  label="Entidad Federal"
                  value={federalEntity}
                  onChange={handleFederalEntityChange}
                  variant="filled"
                  SelectProps={{
                    onOpen: getFederalEntities,
                  }}
                  fullWidth
                >
                  {federalEntities ? (
                    federalEntities.map((federalEntity) => (
                      <MenuItem
                        key={federalEntity.EF_Id}
                        value={federalEntity.EF_Id}
                      >
                        {federalEntity.EF_Nombre}
                      </MenuItem>
                    ))
                  ) : loadingFederalEntities ? (
                    <MenuItem>
                      <Spinner loading={loadingFederalEntities} />
                    </MenuItem>
                  ) : (
                    <MenuItem value={0}>Hubo un error</MenuItem>
                  )}
                </TextField>
                <TextField
                  id="municipality"
                  select
                  label="Municipio"
                  value={municipality}
                  onChange={handleMunicipalityChange}
                  variant="filled"
                  SelectProps={{
                    onOpen: () => getMunicipities(federalEntity),
                  }}
                  fullWidth
                  {...(federalEntity
                    ? {
                        disabled: false,
                      }
                    : { disabled: true })}
                >
                  {municipalities ? (
                    municipalities.map((municipality) => (
                      <MenuItem
                        key={municipality.Municipio_Id}
                        value={municipality.Municipio_Id}
                      >
                        {municipality.Municipio_Nombre}
                      </MenuItem>
                    ))
                  ) : loadingMunicipalities ? (
                    <MenuItem>
                      <Spinner loading={loadingMunicipalities} />
                    </MenuItem>
                  ) : (
                    <MenuItem value={0}>Hubo un error</MenuItem>
                  )}
                </TextField>
                <TextField
                  id="SE_ParroquiaId"
                  select
                  label="Parroquia"
                  name="SE_ParroquiaId"
                  value={parish}
                  onChange={handleParishChange}
                  variant="filled"
                  SelectProps={{
                    onOpen: () => getParishes(municipality),
                  }}
                  fullWidth
                  {...(municipality
                    ? {
                        disabled: false,
                      }
                    : { disabled: true })}
                >
                  {parishes ? (
                    parishes.map((parish) => (
                      <MenuItem
                        key={parish.Parroquia_Id}
                        value={parish.Parroquia_Id}
                      >
                        {parish.Parroquia_Nombre}
                      </MenuItem>
                    ))
                  ) : loadingParishes ? (
                    <MenuItem>
                      <Spinner loading={loadingParishes} />
                    </MenuItem>
                  ) : (
                    <MenuItem value={0}>Hubo un error</MenuItem>
                  )}
                </TextField>
              </CustomStack>
              <CustomStack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ padding: "1rem 0" }}
              >
                <TextField
                  label="Peso Total"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  value={
                    (shippmentDetails && shippmentDetails.SE_PesoTotal) || ""
                  }
                  {...(shippmentDetails &&
                    shippmentDetails.SE_PesoTotal && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                  {...(true && {
                    disabled: true,
                  })}
                ></TextField>
                <TextField
                  label="Valor Total"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  value={
                    (shippmentDetails && shippmentDetails.SE_ValorTotal) || ""
                  }
                  {...(shippmentDetails &&
                    shippmentDetails.SE_ValorTotal && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                  {...(true && {
                    disabled: true,
                  })}
                ></TextField>
              </CustomStack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ padding: "1rem 0" }}
              >
                <Autocomplete
                  value={productType}
                  inputValue={productTypeInput}
                  options={productsTypes && productsTypes}
                  openOnFocus={true}
                  onOpen={() => {
                    getProductsTypes();
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.Producto_Tipo === value.Producto_Tipo
                  }
                  onChange={(event, newValue) => {
                    setProductSelected("");
                    setProductsList([]);
                    if (newValue === undefined || newValue === null)
                      return setProductType("");
                    if (Object.keys(newValue).length === 0)
                      return setProductType("");
                    setProductType(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setProductTypeInput(newInputValue);
                  }}
                  getOptionLabel={(option) => option.Producto_Tipo || ""}
                  loading={loadingProductsTypes}
                  loadingText={
                    <Box sx={{ textAlign: "center" }}>
                      <Spinner loading={loadingProductsTypes} />
                    </Box>
                  }
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de Producto"
                      variant="filled"
                      type="text"
                      id="product_type"
                      name="product_type"
                    />
                  )}
                />
                <Autocomplete
                  value={productSelected}
                  inputValue={productSelectedInput}
                  options={productsList && productsList}
                  openOnFocus={true}
                  onOpen={() => {
                    getProductsList(productType.Producto_Tipo);
                  }}
                  onChange={(event, newValue) => {
                    if (newValue === undefined || newValue === null)
                      return setProductSelected("");
                    if (Object.keys(newValue).length === 0)
                      return setProductSelected("");
                    setProductSelected(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setProductSelectedInput(newInputValue);
                  }}
                  getOptionLabel={(option) => option.Producto_Nombre || ""}
                  loading={loadingProductsList}
                  loadingText={
                    <Box sx={{ textAlign: "center" }}>
                      <Spinner loading={loadingProductsList} />
                    </Box>
                  }
                  {...(productType
                    ? {
                        disabled: false,
                      }
                    : { disabled: true })}
                  sx={{ width: "100%" }}
                  renderOption={(props, option) => (
                    <li {...props}>{option.Producto_Nombre}</li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Producto"
                      variant="filled"
                      type="text"
                      id="productToSave"
                      name="productToSave"
                    />
                  )}
                />
                <TextField
                  label="Cantidad"
                  variant="filled"
                  type="number"
                  id="ProductoSE_Cantidad"
                  name="ProductoSE_Cantidad"
                />
                <IconButton>
                  <AddCircleTwoToneIcon
                    size="large"
                    onClick={handleAddProduct}
                    color="primary"
                  />
                </IconButton>
              </Stack>
              <Box
                sx={{
                  gap: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: ".7rem",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    gap: "1rem",
                    display: "flex",
                    margin: ".7rem",
                  }}
                >
                  <Typography variant="subtitle2" component="h3">
                    Productos agregados al Envío
                  </Typography>
                  <Badge badgeContent={products.length} color="primary" />
                </Box>
                <Chip label="Vaciar Envío" onClick={handleDeleteAllProducts} />
              </Box>
              <Grid
                sx={{ margin: "1rem auto", flexWrap: "wrap", gap: ".3rem" }}
                container
              >
                {products.map((product, index) => {
                  return (
                    <Tooltip
                      title={product.ProductoSE_Cantidad}
                      key={index}
                      arrow
                    >
                      <Chip
                        label={`${product.Producto_Nombre}`}
                        deleteIcon={<DeleteTwoToneIcon />}
                        variant="outlined"
                        onDelete={() => handleDeleteProduct(index)}
                      />
                    </Tooltip>
                  );
                })}
              </Grid>
            </DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                gap: "1rem",
                margin: "1rem 0",
              }}
            >
              <Button onClick={handleClose} variant="outlined">
                Cancelar
              </Button>
              <LoadingButton
                loading={sending}
                variant="outlined"
                onClick={handleSubmitShippment}
              >
                Guardar
              </LoadingButton>
            </Box>
          </>
        )}
      </Dialog>
      {/* File Upload */}
      <Dialog
        open={openFile}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        onClose={handleCloseFile}
      >
        <DialogTitle>{"¿ Desea Agregar un Envío ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, seleccione un Archivo con los datos de los envios que
            desea agregar.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                sx={{ display: "none" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <UploadFileTwoToneIcon size="large" />
              </IconButton>
            </label>
          </Box>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            margin: "1rem 0",
          }}
        >
          <Button onClick={handleCloseFile} variant="text">
            Cancelar
          </Button>
          <Button variant="text">Guardar</Button>
        </Box>
      </Dialog>
    </>
  );
}

export default Add;
