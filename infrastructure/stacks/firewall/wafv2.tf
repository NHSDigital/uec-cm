module "front_end_waf" {
  source                         = "../../modules/firewall"
  waf_name                       = "${var.project}-waf-acl"
  waf_reputation_rule_name       = "${var.project}-aws-ip-reputation-list"
  waf_acl_metric_name            = "${var.project}-waf-acl-metric"
  waf_dashboard_name             = "${var.project}-wafv2-dashboard"
  waf_log_group_name             = "${var.project}-aws-waf-logs"
  non_gb_rule_metric_name        = "${var.project}-waf-non-GB-geo-match-metric"
  ip_reputation_list_metric_name = "${var.project}-waf-aws-ip-reputation-list-metric"
  generate_waf_logs              = false
  aws_region                     = var.aws_region

}
