export const appointmentAction = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return {
    actionStatus: 'ACTION_COMPLETED',
    response: {
      actionSuccessMessage: {
        actionExecutedMessage: 'Your appointment is booked successfully',
        actionExecutedMessageType: 'success',
      },
      hasNextQuestion: true,
      question: 'Can you please share your phone number?',
      type: 'text',
    }
  }
}