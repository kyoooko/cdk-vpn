// OK
// このファイルはVPCスタックで使う詳細内容（VPCとサブネット）を定義

// デフォルト
import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";
// デフォルト
import { Construct } from "constructs";
// lib/resources/abstract/resource.tsをインポート
import { Resource } from "./abstract/resource";
// デフォルト
import { Tags } from "aws-cdk-lib";

// VpcSet（VPCスタックで使う詳細内容）をエクスポート：lib/vpc-stack.tsで使う
export class VpcSet extends Resource {
  public vpc: Vpc;

  constructor() {
    super();
  }

  // 抽象クラスのメソッド①使用：VPCやサブネットの詳細設定
  createResources(scope: Construct) {
    interface subnetConfObj {
      cidrMask: number;
      name: string;
      subnetType: SubnetType;
    }

    let subnetConf: subnetConfObj[];

    subnetConf = [
      {
        cidrMask: 27,
        name: "app-public",
        subnetType: SubnetType.PUBLIC,
      },
      {
        cidrMask: 27,
        name: "tracker-public",
        subnetType: SubnetType.PUBLIC
      },
      {
        cidrMask: 27,
        name: "rds",
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
      {
        cidrMask: 27,
        name: "elasticache",
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
    ];

    this.vpc = new Vpc(scope, "vpc", {
      cidr: "172.16.0.0/17",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 3,
      subnetConfiguration: subnetConf,
    });

    // 抽象クラスのメソッド②使用：今回は「cdk_trial-staging-vpc」という名前（タグ）をつける
    Tags.of(this.vpc).add("Name", this.createResourceName(scope, "vpc"));
  }
}