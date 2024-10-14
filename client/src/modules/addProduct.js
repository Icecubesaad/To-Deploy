// handleSelectChange function for dropdown
export const handleSelectChange = (
  event,
  setformData
) => {
  const { name, value } = event.target;
  setformData(prev => ({
    ...prev,
    [name]: value,
  }));
};

// handleImageChange function for file uploads
export const handleImageChange = (
  file,
  setformData,
  setImageClient,
  seterror,
  seterrorMsg
) => {
  if (file) {
    const isValidFileType = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    const isValidFileSize = file.size <= 10 * 1024 * 1024; // Max 10MB

    if (isValidFileType && isValidFileSize) {
      const newImageUrl = URL.createObjectURL(file);

      setformData(prevState => ({
        ...prevState,
        images: [...prevState.images, file],
      }));

      setImageClient(prevState => [...prevState, { newImageUrl }]);

      seterror(false);
    } else {
      seterror(true);
      seterrorMsg("Invalid file format or size. Please upload a JPEG or PNG file under 10MB.");
    }
  }
};

export const validateForm = (
  formData,
  seterror,
  seterrorMsg
) => {
  for (const [key, value] of Object.entries(formData)) {
    // Check for empty strings
    if (value === "") {
      seterror(true);
      seterrorMsg(`The field "${key}" cannot be empty.`);
      return false;
    }
  }
  if (formData.images.length == 0) {
    seterror(true);
    seterrorMsg("Upload atleast one picture of the product.");
    return false;
  }
  // Validate 'name' (min 10, max 50 characters)
  if (formData.title.length < 10 || formData.title.length > 50) {
    seterror(true);
    seterrorMsg("Name must be between 10 and 50 characters.");
    return false;
  }

  // Validate 'description' (min 50, max 300 characters)
  if (formData.description.length < 50 || formData.description.length > 1000) {
    seterror(true);
    seterrorMsg("Description must be between 50 and 300 characters.");
    return false;
  }

  // Validate 'grade' (must be a single letter between A and D)
  if (formData.grade.length !== 1 || !["A", "B", "C", "D"].includes(formData.grade.toUpperCase())) {
    seterror(true);
    seterrorMsg("Grade must be a single letter between A and D.");
    return false;
  }
  

  // Validate 'purity' (must be a number between 0 and 100)
  const purity = Number(formData.purity);
  if (isNaN(purity) || purity < 0 || purity > 100) {
    seterror(true);
    seterrorMsg("Purity must be a number between 0 and 100.");
    return false;
  }

  // Validate 'units of measure' (must be a recognized unit)
  const validUnits = ["kg", "g", "lb", "oz", "l", "ml"]; // Example valid units
  if (!validUnits.includes(formData.unitsOfMeasure)) {
    seterror(true);
    seterrorMsg(
      "Units of measure must be a valid unit (e.g., kg, g, lb, oz, l, ml)."
    );
    return false;
  }

  // Validate 'type' (must not be empty)
  if (formData.productType === "") {
    seterror(true);
    seterrorMsg("Type cannot be empty.");
    return false;
  }

  // Validate 'moq' (must be a number)
  const moq = Number(formData.moq);
  if (isNaN(moq)) {
    seterror(true);
    seterrorMsg("MOQ must be a number.");
    return false;
  }

  // Validate 'mrp' (must be a number)
  const mrp = Number(formData.mrp);
  if (isNaN(mrp)) {
    seterror(true);
    seterrorMsg("MRP must be a number.");
    return false;
  }

  // If all validations pass
  seterror(false);
  seterrorMsg("");
  return true;
};


// saveProduct function
export const saveProduct = async (
  formData,
  seterror,
  seterrorMsg,
  setloading,
  setsuccess,
  setImageClient,
) => {
  try {
    setloading(true);
    if(!validateForm(formData,seterror,seterrorMsg)){
      setloading(false)
      return;
    }
    if(formData.seller == ''){
      setloading(false);
      window.location.replace("http://localhost:3000/Home?authorized=false");
      return;
    }
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'images') {
        form.append(key, value);
      }
    });
    formData.images.forEach(image => {
      form.append("images", image);
    });
    const request = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/post/addProduct`, {
      method: "POST",
      body: form,
    });
    const response = await request.json();
    if (response.success) {
      setloading(false);
      setsuccess(true);
      setImageClient([]);
      return response.data;
    }
  } catch (error) {
    seterror(true);
    seterrorMsg(error.message || "An error occurred.");
  }
};
