import Form from "../../ui/Form";
import FormRow, { Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isSettingsLoading, settings = {} } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const [updateSettingMutate, updateSettingStatus] = useUpdateSetting();

  if (isSettingsLoading) return <Spinner />;

  const isUpdating = updateSettingStatus === "pending";

  function handleUpdate(e, field) {
    const value = +e.target.value;

    if (!value || value === settings[field]) return;

    updateSettingMutate({ [field]: value });
  }
  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          disabled={isUpdating}
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">Breakfast price</Label>
        <Input
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
