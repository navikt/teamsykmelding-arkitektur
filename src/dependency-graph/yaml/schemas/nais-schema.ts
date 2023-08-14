/**
 * Naisjob defines a NAIS Naisjob.
 */
export interface NaisSchema {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    apiVersion: 'nais.io/v1'
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    kind: 'Naisjob'
    /**
     * ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
     */
    metadata: {
        /**
         * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
         */
        annotations?: {
            [k: string]: string
        }
        /**
         * CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
         *  Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        creationTimestamp?: {}
        /**
         * Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.
         */
        deletionGracePeriodSeconds?: number
        /**
         * DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
         *  Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        deletionTimestamp?: {}
        /**
         * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
         */
        finalizers?: string[]
        /**
         * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
         *  If this field is specified and the generated name exists, the server will return a 409.
         *  Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
         */
        generateName?: string
        /**
         * A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.
         */
        generation?: number
        /**
         * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
         */
        labels: {
            team: string
            [k: string]: string
        }
        /**
         * ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.
         */
        managedFields?: {
            /**
             * APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.
             */
            apiVersion?: string
            /**
             * FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"
             */
            fieldsType?: string
            /**
             * FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.
             */
            fieldsV1?: {
                [k: string]: unknown
            }
            /**
             * Manager is an identifier of the workflow managing these fields.
             */
            manager?: string
            /**
             * Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.
             */
            operation?: string
            /**
             * Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.
             */
            subresource?: string
            /**
             * Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.
             */
            time?: {
                [k: string]: unknown
            }
            [k: string]: unknown
        }[]
        /**
         * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
         */
        name: string
        /**
         * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
         *  Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
         */
        namespace: string
        /**
         * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
         */
        ownerReferences?: {
            /**
             * API version of the referent.
             */
            apiVersion: string
            /**
             * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
             */
            blockOwnerDeletion?: boolean
            /**
             * If true, this reference points to the managing controller.
             */
            controller?: boolean
            /**
             * Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
             */
            kind: string
            /**
             * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
             */
            name: string
            /**
             * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
             */
            uid: string
            [k: string]: unknown
        }[]
        /**
         * An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
         *  Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
         */
        resourceVersion?: string
        /**
         * Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.
         */
        selfLink?: string
        /**
         * UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
         *  Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
         */
        uid?: string
    }
    /**
     * NaisjobSpec contains the NAIS manifest. Please keep this list sorted for clarity.
     */
    spec: {
        /**
         * By default, no traffic is allowed between naisjobs inside the cluster. Configure access policies to explicitly allow communication between naisjobs. This is also used for granting inbound access in the context of Azure AD and TokenX clients.
         */
        accessPolicy?: {
            /**
             * Configures inbound access for your application.
             */
            inbound?: {
                /**
                 * List of NAIS applications that may access your application. These settings apply both to Zero Trust network connectivity and token validity for Azure AD and TokenX tokens.
                 */
                rules: {
                    /**
                     * The application's name.
                     */
                    application: string
                    /**
                     * The application's cluster. May be omitted if it should be in the same cluster as your application.
                     */
                    cluster?: string
                    /**
                     * The application's namespace. May be omitted if it should be in the same namespace as your application.
                     */
                    namespace?: string
                    /**
                     * Permissions contains a set of permissions that are granted to the given application. Currently only applicable for Azure AD clients.
                     */
                    permissions?: {
                        /**
                         * Roles is a set of custom permission roles that are granted to a given application.
                         */
                        roles?: string[]
                        /**
                         * Scopes is a set of custom permission scopes that are granted to a given application.
                         */
                        scopes?: string[]
                        [k: string]: unknown
                    }
                    [k: string]: unknown
                }[]
            }
            /**
             * Configures outbound access for your application.
             */
            outbound?: {
                /**
                 * List of external resources that your applications should be able to reach.
                 */
                external?: {
                    /**
                     * The _host_ that your application should be able to reach, i.e. without the protocol (e.g. `https://`). "Host" and "IPv4" are mutually exclusive
                     */
                    host?: string
                    /**
                     * The IPv4 address that your application should be able to reach. "IPv4" and "Host" are mutually exclusive
                     */
                    ipv4?: string
                    /**
                     * List of port rules for external communication. Must be specified if using protocols other than HTTPS.
                     */
                    ports?: {
                        /**
                         * The port used for communication.
                         */
                        port: number
                        [k: string]: unknown
                    }[]
                    [k: string]: unknown
                }[]
                /**
                 * List of NAIS applications that your application needs to access. These settings apply to Zero Trust network connectivity.
                 */
                rules?: {
                    /**
                     * The application's name.
                     */
                    application: string
                    /**
                     * The application's cluster. May be omitted if it should be in the same cluster as your application.
                     */
                    cluster?: string
                    /**
                     * The application's namespace. May be omitted if it should be in the same namespace as your application.
                     */
                    namespace?: string
                    [k: string]: unknown
                }[]
            }
        }
        /**
         * Once a Naisjob reaches activeDeadlineSeconds, all of its running Pods are terminated and the Naisjob status will become type: Failed with reason: DeadlineExceeded. If set, this takes presedence over BackoffLimit.
         */
        activeDeadlineSeconds?: number
        /**
         * Provisions and configures Azure resources.
         */
        azure?: {
            /**
             * Configures an Azure AD client for this application.
             */
            application: {
                /**
                 * AllowAllUsers denotes whether all users within the tenant should be allowed to access this AzureAdApplication.
                 */
                allowAllUsers?: boolean
                /**
                 * Claims defines additional configuration of the emitted claims in tokens returned to the Azure AD application.
                 */
                claims?: {
                    /**
                     * Extra is a list of additional claims to be mapped from an associated claim-mapping policy. Currently, the only supported values are `NAVident` and `azp_name`.
                     */
                    extra?: ('NAVident' | 'azp_name')[]
                    /**
                     * Groups is a list of Azure AD group IDs to be emitted in the `groups` claim in tokens issued by Azure AD. This also assigns groups to the application for access control. Only direct members of the groups are granted access.
                     */
                    groups?: {
                        /**
                         * ID is the actual `object ID` associated with the given group in Azure AD.
                         */
                        id?: string
                        [k: string]: unknown
                    }[]
                }
                /**
                 * Whether to enable provisioning of an Azure AD application. If enabled, an Azure AD application will be provisioned.
                 */
                enabled: boolean
                /**
                 * ReplyURLs is a list of allowed redirect URLs used when performing OpenID Connect flows for authenticating end-users.
                 */
                replyURLs?: string[]
                /**
                 * SinglePageApplication denotes whether this Azure AD application should be registered as a single-page-application for usage in client-side applications without access to secrets.
                 */
                singlePageApplication?: boolean
                /**
                 * A Tenant represents an organization in Azure AD.
                 *  If unspecified, will default to `trygdeetaten.no` for development clusters and `nav.no` for production clusters.
                 */
                tenant?: 'nav.no' | 'trygdeetaten.no'
            }
        }
        /**
         * Specify the number of retries before considering a Naisjob as failed
         */
        backoffLimit?: number
        /**
         * Override command when starting Docker image.
         */
        command?: string[]
        /**
         * A Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete.
         */
        completions?: number
        /**
         * Specifies how to treat concurrent executions of a job that is created by this Naisjob-cron.
         */
        concurrencyPolicy?: 'Forbid' | 'Replace' | 'Allow'
        /**
         * Custom environment variables injected into your container. Specify either `value` or `valueFrom`, but not both.
         */
        env?: {
            /**
             * Environment variable name. May only contain letters, digits, and the underscore `_` character.
             */
            name: string
            /**
             * Environment variable value. Numbers and boolean values must be quoted. Required unless `valueFrom` is specified.
             */
            value?: string
            /**
             * Dynamically set environment variables based on fields found in the Pod spec.
             */
            valueFrom?: {
                fieldRef: {
                    /**
                     * Field value from the `Pod` spec that should be copied into the environment variable.
                     */
                    fieldPath:
                        | ''
                        | 'metadata.name'
                        | 'metadata.namespace'
                        | 'metadata.labels'
                        | 'metadata.annotations'
                        | 'spec.nodeName'
                        | 'spec.serviceAccountName'
                        | 'status.hostIP'
                        | 'status.podIP'
                    [k: string]: unknown
                }
                [k: string]: unknown
            }
            [k: string]: unknown
        }[]
        /**
         * EnvFrom exposes all variables in the ConfigMap or Secret resources as environment variables. One of `configMap` or `secret` is required.
         *  Environment variables will take the form `KEY=VALUE`, where `key` is the ConfigMap or Secret key. You can specify as many keys as you like in a single ConfigMap or Secret.
         *  The ConfigMap and Secret resources must live in the same Kubernetes namespace as the Naisjob resource.
         */
        envFrom?: {
            /**
             * Name of the `ConfigMap` where environment variables are specified. Required unless `secret` is set.
             */
            configmap?: string
            /**
             * Name of the `Secret` where environment variables are specified. Required unless `configMap` is set.
             */
            secret?: string
            [k: string]: unknown
        }[]
        /**
         * Specify how many failed Jobs should be kept.
         */
        failedJobsHistoryLimit?: number
        /**
         * List of ConfigMap or Secret resources that will have their contents mounted into the containers as files. Either `configMap` or `secret` is required.
         *  Files will take the path `<mountPath>/<key>`, where `key` is the ConfigMap or Secret key. You can specify as many keys as you like in a single ConfigMap or Secret, and they will all be mounted to the same directory.
         *  The ConfigMap and Secret resources must live in the same Kubernetes namespace as the Naisjob resource.
         */
        filesFrom?: {
            /**
             * Name of the `ConfigMap` that contains files that should be mounted into the container. Required unless `secret` or `persistentVolumeClaim` is set.
             */
            configmap?: string
            /**
             * Specification of an empty directory
             */
            emptyDir?: {
                medium?: 'Memory' | 'Disk'
                [k: string]: unknown
            }
            /**
             * Filesystem path inside the pod where files are mounted. The directory will be created if it does not exist. If the directory exists, any files in the directory will be made unaccessible.
             *  Defaults to `/var/run/configmaps/<NAME>`, `/var/run/secrets`, or `/var/run/pvc/<NAME>`, depending on which of them is specified. For EmptyDir, MountPath must be set.
             */
            mountPath?: string
            /**
             * Name of the `PersistentVolumeClaim` that should be mounted into the container. Required unless `configMap` or `secret` is set. This feature requires coordination with the NAIS team.
             */
            persistentVolumeClaim?: string
            /**
             * Name of the `Secret` that contains files that should be mounted into the container. Required unless `configMap` or `persistentVolumeClaim` is set. If mounting multiple secrets, `mountPath` *MUST* be set to avoid collisions.
             */
            secret?: string
            [k: string]: unknown
        }[]
        gcp?: {
            /**
             * Provision BigQuery datasets and give your application's pod mountable secrets for connecting to each dataset. Datasets are immutable and cannot be changed.
             */
            bigQueryDatasets?: {
                /**
                 * When set to true will delete the dataset, when the application resource is deleted. NB: If no tables exist in the bigquery dataset, it _will_ delete the dataset even if this value is set/defaulted to `false`. Default value is `false`.
                 */
                cascadingDelete?: boolean
                /**
                 * Human-readable description of what this BigQuery dataset contains, or is used for. Will be visible in the GCP Console.
                 */
                description?: string
                /**
                 * Name of the BigQuery Dataset. The canonical name of the dataset will be `<TEAM_PROJECT_ID>:<NAME>`.
                 */
                name: string
                /**
                 * Permission level given to application.
                 */
                permission: 'READ' | 'READWRITE'
                [k: string]: unknown
            }[]
            /**
             * Provision cloud storage buckets and connect them to your application.
             */
            buckets?: {
                /**
                 * Allows deletion of bucket. Set to true if you want to delete the bucket.
                 */
                cascadingDelete?: boolean
                /**
                 * Conditions for the bucket to use when selecting objects to delete in cleanup.
                 */
                lifecycleCondition?: {
                    /**
                     * Condition is satisfied when the object reaches the specified age in days. These will be deleted.
                     */
                    age?: number
                    /**
                     * Condition is satisfied when the object is created before midnight on the specified date. These will be deleted.
                     */
                    createdBefore?: string
                    /**
                     * Condition is satisfied when the object has the specified number of newer versions. The older versions will be deleted.
                     */
                    numNewerVersions?: number
                    /**
                     * Condition is satisfied when the object has the specified state.
                     */
                    withState?: '' | 'LIVE' | 'ARCHIVED' | 'ANY'
                    [k: string]: unknown
                }
                /**
                 * The name of the bucket
                 */
                name: string
                /**
                 * Public access prevention allows you to prevent public access to your bucket.
                 */
                publicAccessPrevention?: boolean
                /**
                 * The number of days to hold objects in the bucket before it is allowed to delete them.
                 */
                retentionPeriodDays?: number
                /**
                 * Allows you to uniformly control access to your Cloud Storage resources. When you enable uniform bucket-level access on a bucket, Access Control Lists (ACLs) are disabled, and only bucket-level Identity and Access Management (IAM) permissions grant access to that bucket and the objects it contains.
                 *  Uniform access control can not be reversed after 90 days! This is controlled by Google.
                 */
                uniformBucketLevelAccess?: boolean
                [k: string]: unknown
            }[]
            /**
             * List of _additional_ permissions that should be granted to your application for accessing external GCP resources that have not been provisioned through NAIS.
             */
            permissions?: {
                /**
                 * IAM resource to bind the role to.
                 */
                resource: {
                    /**
                     * Kubernetes _APIVersion_.
                     */
                    apiVersion: string
                    /**
                     * Kubernetes _Kind_.
                     */
                    kind: string
                    /**
                     * Kubernetes _Name_.
                     */
                    name?: string
                    [k: string]: unknown
                }
                /**
                 * Name of the GCP role to bind the resource to.
                 */
                role: string
                [k: string]: unknown
            }[]
            /**
             * Provision database instances and connect them to your application.
             */
            sqlInstances?: {
                /**
                 * If specified, run automatic backups of the SQL database at the given hour. Note that this will backup the whole SQL instance, and not separate databases. Restores are done using the Google Cloud Console.
                 */
                autoBackupHour?: number
                /**
                 * Remove the entire Postgres server including all data when the Kubernetes resource is deleted. *THIS IS A DESTRUCTIVE OPERATION*! Set cascading delete only when you want to remove data forever.
                 */
                cascadingDelete?: boolean
                /**
                 * Sort order for `ORDER BY ...` clauses.
                 */
                collation?: string
                /**
                 * List of databases that should be created on this Postgres server.
                 */
                databases?: {
                    /**
                     * Prefix to add to environment variables made available for database connection. If switching to `EnvVarPrefix` you need to [reset database credentials](https://docs.nais.io/persistence/postgres/#reset-database-credentials).
                     */
                    envVarPrefix?: string
                    /**
                     * Database name.
                     */
                    name: string
                    /**
                     * Add extra users for database access. These users need to be manually given access to database tables.
                     */
                    users?: {
                        /**
                         * User name.
                         */
                        name: string
                        [k: string]: unknown
                    }[]
                    [k: string]: unknown
                }[]
                /**
                 * When set to true, GCP will automatically increase storage by XXX for the database when disk usage is above the high water mark. Setting this field to true also disables manual control over disk size, i.e. the `diskSize` parameter will be ignored.
                 */
                diskAutoresize?: boolean
                /**
                 * How much hard drive space to allocate for the SQL server, in gigabytes. This parameter is used when first provisioning a server. Disk size can be changed using this field _only when diskAutoresize is set to false_.
                 */
                diskSize?: number
                /**
                 * Disk type to use for storage in the database.
                 */
                diskType?: 'SSD' | 'HDD'
                /**
                 * Set flags to control the behavior of the instance. Be aware that NAIS _does not validate_ these flags, so take extra care to make sure the values match against the specification, otherwise your deployment will seemingly work OK, but the database flags will not function as expected.
                 */
                flags?: {
                    /**
                     * Name of the flag.
                     */
                    name: string
                    /**
                     * Value of the flag.
                     */
                    value: string
                    [k: string]: unknown
                }[]
                /**
                 * When set to true this will set up standby database for failover.
                 */
                highAvailability?: boolean
                /**
                 * Configures query insights which are now default for new sql instances.
                 */
                insights?: {
                    /**
                     * True if Query Insights feature is enabled.
                     */
                    enabled?: boolean
                    /**
                     * Maximum query length stored in bytes. Between 256 and 4500. Default to 1024.
                     */
                    queryStringLength?: number
                    /**
                     * True if Query Insights will record application tags from query when enabled.
                     */
                    recordApplicationTags?: boolean
                    /**
                     * True if Query Insights will record client address when enabled.
                     */
                    recordClientAddress?: boolean
                    [k: string]: unknown
                }
                /**
                 * Desired maintenance window for database updates.
                 */
                maintenance?: {
                    day?: number
                    hour?: number
                    [k: string]: unknown
                }
                /**
                 * The name of the instance, if omitted the application name will be used.
                 */
                name?: string
                /**
                 * Enables point-in-time recovery for sql instances using write-ahead logs.
                 */
                pointInTimeRecovery?: boolean
                /**
                 * Number of daily backups to retain. Defaults to 7 backups.
                 */
                retainedBackups?: number
                /**
                 * Server tier, i.e. how much CPU and memory allocated. Available tiers are `db-f1-micro`, `db-g1-small` and custom `db-custom-CPU-RAM`. Custom memory must be mulitple of 256 MB and at least 3.75 GB (e.g. `db-custom-1-3840` for 1 cpu, 3840 MB ram) Also check out [sizing your database](../../persistence/postgres/#sizing-your-database).
                 */
                tier?: string
                /**
                 * PostgreSQL version.
                 */
                type: 'POSTGRES_11' | 'POSTGRES_12' | 'POSTGRES_13' | 'POSTGRES_14' | 'POSTGRES_15'
                [k: string]: unknown
            }[]
        }
        /**
         * Your Naisjob's Docker image location and tag.
         */
        image: string
        /**
         * An Influxdb via Aiven. A typical use case is to store metrics from your application and visualize them in Grafana. See [navikt/aiven-iac](https://github.com/navikt/aiven-iac) repository
         */
        influx?: {
            /**
             * Provisions an InfluxDB instance and configures your application to access it. Use the prefix: `influx-` + `team` that you specified in the [navikt/aiven-iac](https://github.com/navikt/aiven-iac) repository.
             */
            instance: string
        }
        /**
         * Enable Aiven Kafka for your Naisjob.
         */
        kafka?: {
            /**
             * Configures your application to access an Aiven Kafka cluster.
             */
            pool: string
            /**
             * Allow this app to use kafka streams
             */
            streams?: boolean
        }
        /**
         * Many Naisjobs running for long periods of time eventually transition to broken states, and cannot recover except by being restarted. Kubernetes provides liveness probes to detect and remedy such situations. Read more about this over at the [Kubernetes probes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
         */
        liveness?: {
            /**
             * When a Pod starts, and the probe fails, Kubernetes will try _failureThreshold_ times before giving up. Giving up in case of a startup probe means restarting the Pod.
             */
            failureThreshold?: number
            /**
             * Number of seconds after the container has started before startup probes are initiated.
             */
            initialDelay?: number
            /**
             * HTTP endpoint path that signals 200 OK if the application has started successfully.
             */
            path: string
            /**
             * How often (in seconds) to perform the probe.
             */
            periodSeconds?: number
            /**
             * Port for the startup probe.
             */
            port?: number
            /**
             * Number of seconds after which the probe times out.
             */
            timeout?: number
        }
        /**
         * Format of the logs from the container. Use this if the container doesn't support JSON logging and the log is in a special format that need to be parsed.
         */
        logformat?:
            | ''
            | 'accesslog'
            | 'accesslog_with_processing_time'
            | 'accesslog_with_referer_useragent'
            | 'capnslog'
            | 'logrus'
            | 'gokit'
            | 'redis'
            | 'glog'
            | 'simple'
            | 'influxdb'
            | 'log15'
        /**
         * Extra filters for modifying log content. This can e.g. be used for setting loglevel based on http status code.
         */
        logtransform?: 'http_loglevel' | 'dns_loglevel'
        /**
         * Configures a Maskinporten client for this Naisjob. See [Maskinporten](https://doc.nais.io/security/auth/maskinporten/) for more details.
         */
        maskinporten?: {
            /**
             * If enabled, provisions and configures a Maskinporten client with consumed scopes and/or Exposed scopes with DigDir.
             */
            enabled: boolean
            /**
             * Schema to configure Maskinporten clients with consumed scopes and/or exposed scopes.
             */
            scopes?: {
                /**
                 * This is the Schema for the consumes and exposes API. `consumes` is a list of scopes that your client can request access to.
                 */
                consumes?: {
                    /**
                     * The scope consumed by the application to gain access to an external organization API. Ensure that the NAV organization has been granted access to the scope prior to requesting access.
                     */
                    name: string
                    [k: string]: unknown
                }[]
                /**
                 * `exposes` is a list of scopes your application want to expose to other organization where access to the scope is based on organization number.
                 */
                exposes?: {
                    /**
                     * Whitelisting of integration's allowed. Default is `maskinporten`
                     */
                    allowedIntegrations?: [string, ...string[]]
                    /**
                     * Max time in seconds for a issued access_token. Default is `30` sec.
                     */
                    atMaxAge?: number
                    /**
                     * External consumers granted access to this scope and able to request access_token.
                     */
                    consumers?: {
                        /**
                         * This is a describing field intended for clarity not used for any other purpose.
                         */
                        name?: string
                        /**
                         * The external business/organization number.
                         */
                        orgno: string
                        [k: string]: unknown
                    }[]
                    /**
                     * If Enabled the configured scope is available to be used and consumed by organizations granted access.
                     */
                    enabled: boolean
                    /**
                     * The actual subscope combined with `Product`. Ensure that `<Product><Name>` matches `Pattern`.
                     */
                    name: string
                    /**
                     * The product-area your application belongs to e.g. arbeid, helse ... This will be included in the final scope `nav:<Product><Name>`.
                     */
                    product: string
                    [k: string]: unknown
                }[]
            }
        }
        /**
         * To get your own OpenSearch instance head over to the IaC-repo to provision each instance. See [navikt/aiven-iac](https://github.com/navikt/aiven-iac) repository.
         */
        openSearch?: {
            /**
             * Access level for OpenSearch user
             */
            access?: 'read' | 'write' | 'readwrite' | 'admin'
            /**
             * Configure your application to access your OpenSearch instance. Use the `instance_name` that you specified in the [navikt/aiven-iac](https://github.com/navikt/aiven-iac) repository.
             */
            instance: string
        }
        /**
         * For running pods in parallel. If it is specified as 0, then the Job is effectively paused until it is increased.
         */
        parallelism?: number
        /**
         * PreStopHook is called immediately before a container is terminated due to an API request or management event such as liveness/startup probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits by itself. The reason for termination is passed to the handler.
         */
        preStopHook?: {
            /**
             * Command that should be run inside the main container just before the pod is shut down by Kubernetes.
             */
            exec?: {
                /**
                 * Command is the command line to execute inside the container before the pod is shut down. The command is not run inside a shell, so traditional shell instructions (pipes, redirects, etc.) won't work. To use a shell, you need to explicitly call out to that shell.
                 *  If the exit status is non-zero, the pod will still be shut down, and marked as `Failed`.
                 */
                command?: string[]
            }
            /**
             * HTTP GET request that is called just before the pod is shut down by Kubernetes.
             */
            http?: {
                /**
                 * Path to access on the HTTP server.
                 */
                path: string
                /**
                 * Port to access on the container. Defaults to application port, as defined in `.spec.port`.
                 */
                port?: number
            }
        }
        /**
         * Sometimes, Naisjobs are temporarily unable to serve traffic. For example, an Naisjob might need to load large data or configuration files during startup, or depend on external services after startup. In such cases, you don't want to kill the Naisjob, but you don’t want to send it requests either. Kubernetes provides readiness probes to detect and mitigate these situations. A pod with containers reporting that they are not ready does not receive traffic through Kubernetes Services. Read more about this over at the [Kubernetes readiness documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
         */
        readiness?: {
            /**
             * When a Pod starts, and the probe fails, Kubernetes will try _failureThreshold_ times before giving up. Giving up in case of a startup probe means restarting the Pod.
             */
            failureThreshold?: number
            /**
             * Number of seconds after the container has started before startup probes are initiated.
             */
            initialDelay?: number
            /**
             * HTTP endpoint path that signals 200 OK if the application has started successfully.
             */
            path: string
            /**
             * How often (in seconds) to perform the probe.
             */
            periodSeconds?: number
            /**
             * Port for the startup probe.
             */
            port?: number
            /**
             * Number of seconds after which the probe times out.
             */
            timeout?: number
        }
        /**
         * List of redis instances this job needs credentials for. Must be owned by same team.
         */
        redis?: {
            /**
             * Access level for redis user
             */
            access?: 'read' | 'write' | 'readwrite' | 'admin'
            /**
             * The last part of the name used when creating the instance (ie. redis-<team>-<instance>)
             */
            instance?: string
            [k: string]: unknown
        }[]
        /**
         * When Containers have [resource requests](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) specified, the Kubernetes scheduler can make better decisions about which nodes to place pods on.
         */
        resources?: {
            /**
             * Limit defines the maximum amount of resources a container can use before getting evicted.
             */
            limits?: {
                cpu?: string
                memory?: string
            }
            /**
             * Request defines the amount of resources a container is allocated on startup.
             */
            requests?: {
                cpu?: string
                memory?: string
            }
        }
        /**
         * RestartPolicy describes how the container should be restarted. Only one of the following restart policies may be specified. If none of the following policies is specified, the default one is Never. Read more about [Kubernetes handling pod and container failures](https://kubernetes.io/docs/concepts/workloads/controllers/job/#handling-pod-and-container-failures)
         */
        restartPolicy?: 'OnFailure' | 'Never'
        /**
         * The [Cron](https://en.wikipedia.org/wiki/Cron) schedule for running the Naisjob. If not specified, the Naisjob will be run as a one-shot Job. The timezone for Naisjobs defaults to UTC.
         */
        schedule?: string
        /**
         * Whether or not to enable a sidecar container for secure logging.
         */
        secureLogs?: {
            /**
             * Whether to enable a sidecar container for secure logging. If enabled, a volume is mounted in the pods where secure logs can be saved.
             */
            enabled: boolean
        }
        /**
         * Whether to skip injection of NAV certificate authority bundle or not. Defaults to false.
         */
        skipCaBundle?: boolean
        /**
         * Kubernetes uses startup probes to know when a container application has started. If such a probe is configured, it disables liveness and readiness checks until it succeeds, making sure those probes don't interfere with the application startup. This can be used to adopt liveness checks on slow starting containers, avoiding them getting killed by Kubernetes before they are up and running.
         */
        startup?: {
            /**
             * When a Pod starts, and the probe fails, Kubernetes will try _failureThreshold_ times before giving up. Giving up in case of a startup probe means restarting the Pod.
             */
            failureThreshold?: number
            /**
             * Number of seconds after the container has started before startup probes are initiated.
             */
            initialDelay?: number
            /**
             * HTTP endpoint path that signals 200 OK if the application has started successfully.
             */
            path: string
            /**
             * How often (in seconds) to perform the probe.
             */
            periodSeconds?: number
            /**
             * Port for the startup probe.
             */
            port?: number
            /**
             * Number of seconds after which the probe times out.
             */
            timeout?: number
        }
        /**
         * Specify how many completed Jobs should be kept.
         */
        successfulJobsHistoryLimit?: number
        /**
         * The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. For most jobs, the default is more than enough. Defaults to 30 seconds.
         */
        terminationGracePeriodSeconds?: number
        /**
         * Specify the number of seconds to wait before removing the Job after it has finished (either Completed or Failed). If the field is unset, this Job won't be cleaned up by the TTL controller after it finishes.
         */
        ttlSecondsAfterFinished?: number
        /**
         * Provides secrets management, identity-based access, and encrypting application data for auditing of secrets for applications, systems, and users.
         */
        vault?: {
            /**
             * If set to true, fetch secrets from Vault and inject into the pods.
             */
            enabled?: boolean
            /**
             * List of secret paths to be read from Vault and injected into the pod's filesystem. Overriding the `paths` array is optional, and will give you fine-grained control over which Vault paths that will be mounted on the file system.
             *  By default, the list will contain an entry with
             *  `kvPath: /kv/<environment>/<zone>/<application>/<namespace>` `mountPath: /var/run/secrets/nais.io/vault`
             *  that will always be attempted to be mounted.
             */
            paths?: {
                /**
                 * Format of the secret that should be processed.
                 */
                format?: 'flatten' | 'json' | 'yaml' | 'env' | 'properties' | ''
                /**
                 * Path to Vault key/value store that should be mounted into the file system.
                 */
                kvPath: string
                /**
                 * File system path that the secret will be mounted into.
                 */
                mountPath: string
                [k: string]: unknown
            }[]
            /**
             * If enabled, the sidecar will automatically refresh the token's Time-To-Live before it expires.
             */
            sidecar?: boolean
        }
        /**
         * Inject on-premises web proxy configuration into the job container. Most Linux applications should auto-detect these settings from the `$HTTP_PROXY`, `$HTTPS_PROXY` and `$NO_PROXY` environment variables (and their lowercase counterparts). Java applications can start the JVM using parameters from the `$JAVA_PROXY_OPTIONS` environment variable.
         */
        webproxy?: boolean
    }
    /**
     * Status contains different NAIS status properties
     */
    status?: {
        conditions?: {
            /**
             * lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.
             */
            lastTransitionTime: {
                [k: string]: unknown
            }
            /**
             * message is a human readable message indicating details about the transition. This may be an empty string.
             */
            message: string
            /**
             * observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.
             */
            observedGeneration?: number
            /**
             * reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.
             */
            reason: string
            /**
             * status of the condition, one of True, False, Unknown.
             */
            status: 'True' | 'False' | 'Unknown'
            /**
             * type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)
             */
            type: string
            [k: string]: unknown
        }[]
        correlationID?: string
        deploymentRolloutStatus?: string
        rolloutCompleteTime?: number
        synchronizationHash?: string
        synchronizationState?: string
        synchronizationTime?: number
    }
}
