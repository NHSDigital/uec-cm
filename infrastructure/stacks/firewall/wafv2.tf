module "front_end_waf" {
  source                         = "../../modules/firewall"
  waf_name                       = "${var.project}-${var.waf_name}"
  waf_reputation_rule_name       = "${var.project}-${var.aws_ip_reputation_rule_name}"
  waf_acl_metric_name            = "${var.project}-${var.acl_metric_name}"
  waf_dashboard_name             = "${var.project}-${var.waf_dashboard_name}"
  waf_log_group_name             = "${var.project}-${var.waf_log_group_name}"
  non_gb_rule_metric_name        = "${var.project}-${var.non_gb_rule_metric_name}"
  ip_reputation_list_metric_name = "${var.project}-${var.ip_reputation_list_metric_name}"
  generate_waf_logs              = var.generate_waf_logs
  aws_region                     = var.aws_region

}
