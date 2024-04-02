type ClerkWebhookEventType = "user.created" | "user.deleted" | "user.updated";

type ClerkWebhookEvent<EventType, Data> = {
    type: EventType;
    object: "event";
    data: Data;
};

export type { ClerkWebhookEvent, ClerkWebhookEventType };
