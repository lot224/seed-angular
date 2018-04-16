function fixRadioButtons(idx) {


  BodyDamage_Yes.disabled = false;
  BodyDamage_No.disabled = false;
  GlassDamage_Yes.disabled = false;
  GlassDamage_No.disabled = false;
  TowRequired_Yes.disabled = false;
  TowRequired_No.disabled = false;

  lblDateOfLoss.innerText = '<%=DateOfLoss%>';

  if (ClaimTypeID === 1) {
    // Body Damage = true
    // Hide Body Damage

  } else if (ClaimTypeID === 2) {
    // Body Damage = false
    // Hide Body Damage

    // Glass Damage = true
    // Hide Glass Damage

  } else if (ClaimTypeID === 3) {
    // Body Damage = false
    // Hide Body Damage

    // Glass Damage = false
    // Hide Glass Damage

    // Tow Required = false
    // Hide Tow Required

  } else if (ClaimTypeID === 4) {
    // Body Damage = false

    // Glass Damage = true
    // Hide Glass Damage

  } else if (ClaimTypeID === 5) {

    // Body Damage = false
    // Hide Body Damage

    // Glass Damage = false
    // Hide Glass Damage

    // Tow Required = false
    // Hide Tow Required

  } else if (ClaimTypeID === 6) {
    // Body Damage = false
    // Hide Body Damage

  } else if (ClaimTypeID == 12) {

    // Body Damage = true
    // Hide Body Damage

    // Glass Damage = false
    // Hide Glass Damage

    // Tow Required = false
    // Hide Tow Required

  } else if (ClaimTypeID == 13) {

    // Body Damage = false
    // Hide Body Damage

    // Glass Damage = false
    // Hide Glass Damage

    // Tow Required = false
    // Hide Tow Required

  }

  ChangeGlassDamageSelector(GlassDamage_Yes.checked);
  ChangeVehicleLocationVis(TowRequired_Yes.checked);
  ShowIncidentMessage(AllowServiceType(ClaimTypeID));
  return true;
};