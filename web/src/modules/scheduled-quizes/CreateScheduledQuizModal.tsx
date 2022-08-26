import { Form, Formik } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { InputField } from "../../form-fields/InputField";
import { Modal } from "../../ui/Modal";
import { User } from "../ws";
import {
  MuiPickersUtilsProvider,
  Clock,
  DateTimePicker,
} from "@material-ui/pickers";
import { add } from "date-fns";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { showErrorToast } from "../../lib/showErrorToast";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { InputErrorMsg } from "../../ui/InputErrorMsg";

export interface ScheduleQuizFormData {
  name: string;
  description: string;
  cohosts: User[];
  scheduledFor: Date;
}

interface CreateScheduledQuizModalProps {
  editInfo?: { intialValues: ScheduleQuizFormData; id: string };
  onScheduledQuiz: (data: ScheduleQuizFormData, resp: any) => void;
  onRequestClose: () => void;
}

const colors = {
  p100: "#dee3ea",
  p200: "#b2bdcd",
  p300: "#5d7290",
  p600: "#323d4d",
  p700: "#242c37",
  p800: "#151a21",
  p900: "#0b0e11",
  accent: "#fd4d4d",
  accentHover: "#fd6868",
  white: "#FFF",
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.accent,
    },
    secondary: {
      main: colors.accent,
    },
  },
  overrides: {},
});

export const CreateScheduledQuizModal: React.FC<
  CreateScheduledQuizModalProps
> = ({ onRequestClose, onScheduledQuiz, editInfo }) => {
  const { t } = useTypeSafeTranslation();

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Modal isOpen onRequestClose={onRequestClose} title={`Schedule a Quiz`}>
          <Formik
            initialValues={
              editInfo?.intialValues || {
                name: "",
                description: "",
                cohosts: [] as User[],
                scheduledFor: add(new Date(), { days: 1 }),
              }
            }
            validateOnChange={false}
            validateOnBlur={false}
            validate={({ name, scheduledFor }) => {
              const errors: Record<string, string> = {};

              if (name.length < 2) {
                return {
                  name: "erorr",
                };
              }

              if (scheduledFor.getTime() < new Date().getTime()) {
                return {
                  scheduledFor: "erorr",
                };
              }

              return errors;
            }}
            onSubmit={async (allData) => {
              const { name, scheduledFor, ...data } = allData;
              const scheduledForISO = scheduledFor.toISOString();
              const resp = "" as any;

              if ("error" in resp && resp.error) {
                showErrorToast(resp.error, "error");
                return;
              } else {
                onScheduledQuiz(allData, resp);
              }
              onRequestClose();
            }}
          >
            {({ setFieldValue, values, errors, isSubmitting }) => (
              <Form className="flex-col w-full">
                <InputField
                  name="name"
                  maxLength={60}
                  placeholder={t("modals.createQuizModal.quizName")}
                  autoFocus
                />
                <div className={`flex mt-4 w-full flex-col`}>
                  <DateTimePicker
                    value={values.scheduledFor}
                    minDate={new Date()}
                    maxDate={add(new Date(), { months: 6 })}
                    onChange={() => {}}
                  />
                  {errors.scheduledFor ? (
                    <div className={`flex mt-1`}>
                      <InputErrorMsg>
                        {errors.scheduledFor as any}
                      </InputErrorMsg>
                    </div>
                  ) : null}
                  <div className={`flex mt-4`}>
                    <InputField
                      textarea
                      placeholder={t("modals.createQuizModal.quizDescription")}
                      name="description"
                      maxLength={200}
                    />
                  </div>
                </div>

                <div
                  className={`flex pt-4 space-x-3 col-span-full items-center`}
                >
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className={`mr-3`}
                  >
                    {t("common.ok")}
                  </Button>
                  <ButtonLink type="button" onClick={onRequestClose}>
                    {t("common.cancel")}
                  </ButtonLink>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
