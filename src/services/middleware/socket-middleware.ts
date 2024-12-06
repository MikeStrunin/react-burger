import { Middleware } from "redux";
import { RootState } from "../hooks";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type WSActions<R, S> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
    sendMessage?: ActionCreatorWithPayload<S>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
    wsActions: WSActions<R, S>,
    withTokenRefresh: boolean = false,
): Middleware<NonNullable<unknown>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = "";
        let isConnected = false;
        let reconnectTimer = 0;
        const {
            connect,
            disconnect,
            onConnecting,
            onOpen,
            onClose,
            onError,
            onMessage,
            sendMessage,
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;

            if (connect.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                isConnected = true;
                onConnecting && dispatch(onConnecting());

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                }

                socket.onerror = () => {
                    dispatch(onError("Error"));
                }

                socket.onmessage = (event) => {
                    const { data } = event;

                    try {
                        const parsedData = JSON.parse(data);

                        //                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                        //                            refreshToken()
                        //                                .then((refreshedData) => {
                        //                                    const wssUrl = new URL(url);
                        //                                    wssUrl.searchParams.set(
                        //                                        "token",
                        //                                        refreshedData.accessToken.replace("Bearer ", "")
                        //                                    );
                        //                                    dispatch(connect(wssUrl.toString()));
                        //                                })
                        //                                .catch((err) => {
                        //                                    dispatch(onError((err as Error).message));
                        //                                })
                        //
                        //                            dispatch(disconnect());
                        //
                        //                            return;
                        //                        }

                        dispatch(onMessage(parsedData));
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }

                }

                socket.onclose = () => {
                    onClose && dispatch(onClose())

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url));
                        }, RECONNECT_PERIOD);
                    }
                }
            }

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (err) {
                    dispatch(onError((err as Error).message));
                }
            }

            if (socket && disconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}