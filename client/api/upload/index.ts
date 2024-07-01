import { useClientRequest } from "~/composables/useRequest";
import type * as UploadTypes from "./types";

export function getStsIdentity(): Promise<UploadTypes.GetSTSResult> {
  return useClientRequest("/img/get-sts-identity", {
    method: "POST",
  });
}

export function upload() {
  return useClientRequest("/img/upload", {
    method: "POST",
  });
}
