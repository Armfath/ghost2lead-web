import { API_ENDPOINTS } from "@/config";
import { get, post } from "@/lib/fetch";

const { CREATE, GET_LEADS } = API_ENDPOINTS.LEADS;

export async function getOrCreateLead(
	leadId?: string | null,
): Promise<LeadCreateResponse> {
	return post<LeadCreateResponse>(CREATE, {
		lead_id: leadId ?? undefined,
	});
}

interface GetLeadsParams {
	page?: number;
	page_size?: number;
}

export async function getLeads(
	params?: GetLeadsParams,
): Promise<PaginationResponse<LeadResponse>> {
	return get<PaginationResponse<LeadResponse>>(GET_LEADS, {
		params: {
			searchParams: {
				page: params?.page?.toString(),
				page_size: params?.page_size?.toString(),
			},
		},
	});
}
