import useFetchUrlContent from "../hooks/useFetchUrlContent";
import ExtensionBottomContent from "./extensionBottomContent/ExtensionBottomContent";
import ExtensionTopContent from "./extensionTopContent/ExtensionTopContent";

function ExtensionContent() {
  const { isLoading, isError } = useFetchUrlContent();

  return (
    <>
      <ExtensionTopContent
        isLoading={isLoading}
        isError={isError}
      />
      <ExtensionBottomContent
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
}

export default ExtensionContent;
