import { turnRepository } from "../../repositories/turnRepository";
import { createTurnUseCase } from "../../useCases/turns/createTurn";

export const turnWebhook = async (paymentInfo: any) => {
  const {
    user_id: userId,
    service_id: serviceId,
    service_name: serviceName,
    hour,
    date,
    phone_number :phoneNumber
  } = paymentInfo.metadata;

  const turn = {
    id: "test",
    serviceName,
    serviceId,
    hour,
    userId,
    date,
    phoneNumber
  };

  await createTurnUseCase(turn, turnRepository);
  console.log(
    `Turno reservado para ${userId} en el servicio ${serviceName} el ${date} a las ${hour}`
  );
};
