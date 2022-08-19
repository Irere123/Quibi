import { useRouter } from "next/router";
import { useCurrentQuizInfo } from "../../hooks/useCurrentQuizInfo";
import { useLeaveQuiz } from "../../hooks/useLeaveQuiz";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { PersonAdd, PlusIcon } from "../../icons";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { BoxedIcon } from "../../ui/BoxedIcon";

interface FloatingQuizInfoProps {}

export const FloatingQuizInfo: React.FC<FloatingQuizInfoProps> = () => {
  const { currentQuizId } = useCurrentQuizIdStore();
  const { leaveQuiz } = useLeaveQuiz();
  const { data } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", currentQuizId!],
    {
      enabled: !!currentQuizId,
    },
    [currentQuizId!]
  );
  const router = useRouter();
  if (!data || "error" in data) {
    return null;
  }

  const { quiz } = data;

  return (
    <div
      id="floating-room-container"
      style={{ width: "70vw" }}
      className="flex fixed bottom-12 shadow-sm shadow-secondary-50 right-4 border-accent border rounded-lg bg-primary-800 items-center"
    >
      <button
        onClick={() => {
          router.push(`/quiz/${quiz.id}`);
        }}
        style={{ minWidth: 100 }}
        className="truncate text-primary-100 mr-4 p-3"
      >
        {quiz.name}
      </button>
      <BoxedIcon
        data-testid="invite"
        onClick={() => {
          leaveQuiz();
        }}
        className={`mr-1`}
      >
        <PlusIcon className="transform rotate-45" />
      </BoxedIcon>
    </div>
  );
};
