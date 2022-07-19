import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMerchantAccount } from "../../services/merchant/useMerchantAccount";
import { useUpdateMerchantAccount } from "../../services/merchant/useUpdateMerchantAccount";
import { showNotification } from "@mantine/notifications";

const UpdateMerchantInfo = () => {
  const {
    data: merchantAccount,
    refetch,
    isRefetching: isRefetching,
  } = useMerchantAccount();
  const { mutateAsync: update, isLoading: isUpdating } =
    useUpdateMerchantAccount();
  const form = useForm({
    initialValues: {
      name: merchantAccount?.name,
      description: merchantAccount?.description,
      logo_url: merchantAccount?.logoUrl,
    },
    validate: {},
  });
  const isLoading = isRefetching || isUpdating;
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="col-12 col-md-4">
        <Card className="d-flex flex-column align-items-center justify-content-between">
          <Avatar radius="xl" src={merchantAccount?.logoUrl} size={240} />
          <Text weight={700} style={{ fontSize: "24px" }} className="mt-4">
            {merchantAccount?.name || "Your Merchant Name"}
          </Text>
        </Card>
      </div>
      <div style={{ backgroundColor: "white" }} className="p-3 col-12 col-md-7">
        <Box>
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                await update({
                  ...values,
                });
                await refetch();
              } catch (e) {
                showNotification({
                  title: "Something went wrong!",
                  message: `${e.toString()}`,
                  color: "red",
                });
              }
            })}
          >
            <TextInput
              required
              label="Name"
              placeholder="Maius Pay"
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="Description"
              placeholder="Maius Pay is a subscription service"
              {...form.getInputProps("description")}
            />
            <TextInput
              required
              label="Logo URL"
              placeholder="Maius Pay"
              {...form.getInputProps("logo_url")}
            />

            <Group position="right" mt="md">
              <Button loading={isLoading} type="submit">
                Save
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default UpdateMerchantInfo;
