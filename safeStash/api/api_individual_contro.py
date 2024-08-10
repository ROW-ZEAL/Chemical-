from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_individual_saving(request):
    individual_deposit_results = get_individual_deposit(request=request)
    return {
        "individual_summary": individual_deposit_results,
    }


def get_individual_deposit(request):
    individual_deposit_results_query = """ SELECT
                                            member_id,
                                            first_name,
                                            number,
                                            email,
                                            SUM(amount) AS total_amount
                                        FROM
                                            (
                                            SELECT
                                                member_id,
                                                first_name,
                                                number,
                                                email,
                                                amount,
                                                deposit_date
                                            FROM
                                                deposit d
                                                JOIN aikyam_finance af ON d.member_id = af.id
                                            ) c
                                        GROUP BY
                                            member_id,
                                            first_name,
                                            number,
                                            email;
                                     """
    return list(execute_query_and_map_results(individual_deposit_results_query))